/**
 * Created by Javi on 05/12/2015.
 */
'use strict'
app.controller('loginCtrl',['$scope', '$location', '$cookies', '$cookieStore','$http', function($scope, $location, $cookies, $cookieStore,$http) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;

    $cookieStore.remove('idlogin');

    $scope.uploadFile = function() {
        var file = $scope.file;
        console.log (file);
    };
    $scope.enterChat = function() {
        $location.path('/application/chat');
    };
    // Funcion para logear un usuario
    $scope.loginUser = function (newUser) {
        if ((!newUser.username) && (!newUser.password)){
            $scope.user.u = "Usuario es requerido";
            $scope.user.p = "Password es requerido";
        }
        else if (!newUser.username){
            $scope.user.u = "Usuario es requerido";
            $scope.user.p = "";
        }
        else if (!newUser.password){
            $scope.user.u = "";
            $scope.user.p = "Password es requerido";
        }
        else {

            $http.post('/api/users/login', newUser)
                .success(function (data) {
                    console.log(data);
                    $cookieStore.put('idlogin', data.user[0]._id);
                    $cookieStore.put('conectado', data.user[0].username);

                    if (data.user[0].rol=="administrador") {
                        console.log ("entra admin...");
                        $location.path('/admin/home');
                    }
                    else{
                        console.log ("entra register...");
                        $location.path('/app/home');
                    }

                })
                .error(function (data) {
                    swal("Opps!", "Usuario o password incorrecto!", "error")
                    console.log(data);

                })
        }


    };
    // Funcion para registrar a un usuario
    $scope.registerUser = function(newUser) {
        if ((!newUser.name) && (!newUser.username) && (!newUser.email) && (!newUser.password)&& (!newUser.city)&& (!newUser.college)&&(!newUser.gender)) {

        }
        else if (!newUser.name) {


        }

        else if (!newUser.username) {


        }
        else if (!newUser.email) {


        }
        else if (!newUser.password) {


        }
        else if (!newUser.city) {


        }
        else if (!newUser.college) {


        }
        else if (!newUser.gender) {


        }
        else if (!$scope.file) {

            swal("Opps!", "Debes elegir una imagen de perfil!", "error")
        }
        else{

            var formData = new FormData();
            var username = newUser.username;
            var file = $scope.file;
            formData.append("file", file);
            $http.post('/api/users', newUser)
                .success(function (data) {

                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

            $http.put('/api/users/upload/' + username, formData, {
                    headers: {
                        "Content-type": undefined
                    },
                    transformRequest: angular.identity
                }
                )
                .success(function (data) {

                    $location.path('/app/signin');
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });


        }


    };


}]);