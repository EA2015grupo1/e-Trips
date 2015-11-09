
var app = angular.module('App', ['ngCookies'])

app.controller('Controller', ['$scope','$http', '$window', '$cookies','$cookieStore', function($scope, $http, $window,$cookies,$cookieStore, SweetAlert ) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;
    var id = $cookieStore.get('id');
    console.log (id);


// Función que obtiene un objeto usuario conocido su id
        $http.get('/api/users/' + id)
            .success(function(data) {
                $scope.user._id = data._id;
                $scope.user.username = data.username;
                $scope.user.name = data.name;
                $scope.user.email = data.email;
                console.log (data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    // Función para editar los datos de un usuario
    $scope.updateUser = function(newUser) {
        $http.put('/api/users/' + $scope.user._id, $scope.user)
            .success(function(data) {
                $scope.users = data;
                console.log (data);
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