
var app = angular.module('MainApp', ['ngCookies'])

app.controller('mainController', ['$scope','$http', '$window', '$cookies', '$cookieStore', function($scope, $http, $window,$cookies, $cookieStore,SweetAlert ) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;

    // Obtenemos todos los datos de la base de datos
    $http.get('/api/users').success(function(data) {
            $scope.users= data;

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Funci�n para logear un usuario
    $scope.loginUser = function (newUser) {
        $http.post('/api/users/login', newUser)
            .success(function (data) {
                // $window.open('users.html'
                $scope.users = data;
                $window.location.href = 'users.html';

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    // Función para registrar a una empresa
    $scope.registerUser = function() {
        $http.post('/api/users', $scope.newUser)
            .success(function(data) {
                // $scope.newUser = {}; // Borramos los datos del formulario
                $scope.users = data;
                //SweetAlert.swal("Good job!", "You clicked the button!", "success");
                $window.location.href = 'users.html';
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

// Función que obtiene un objeto usuario conocido su id
    $scope.getUser = function(id) {
        console.log (id);
        $cookieStore.put('id', id);
        $window.location.href = 'user_profile.html';
    };
    // Función que borra un objeto usuario conocido su id
    $scope.deleteUser = function(id) {
        $http.delete('/api/users/' + id)
            .success(function(data) {
               // $scope.newUser = {};
                $scope.users = data;
                $window.location.href = 'users.html';
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // Función para coger el objeto seleccionado en la tabla
    $scope.selectUser = function(user) {
        $scope.newUser = user;
        $scope.selected = true;
        console.log($scope.newUser, $scope.selected);
    }
}]);