/**
 * Created by Javi on 05/12/2015.
 */
'use strict'
app.controller('loginCtrl',['$scope', '$location', '$cookies', '$cookieStore','$http', function($scope, $location, $cookies, $cookieStore,$http) {

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;
    $cookieStore.remove('idlogin');
    $scope.cityselectedItem = "Ciudades";
    $scope.collegeselectedItem = "Universidades";
    var city;
    var college
    $http.get('/api/cities').success(function (data) {
            $scope.cities = data;

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    $scope.cityitemselected = function (item) {
        $scope.collegeselectedItem = "Universidades";
        city = item;
        $scope.cityselectedItem = item;
        $http.get('/api/colleges/' + item)
            .success(function(data) {
                $scope.colleges = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    };
    $scope.collegeitemselected = function (item) {
        college = item;
        $scope.collegeselectedItem = item;
        $scope.collegItem = item;
        $http.get('/api/colleges/' + city)
            .success(function(data) {
                $scope.colleges = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    };
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
        }
        else if (!newUser.username){
        }
        else if (!newUser.password){
        }
        else{

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
                   // swal("Opps!", "Usuario o password incorrecto!", "error")
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Usuario o password incorrecto!'
                    }];
                    console.log(data);

                })
        }

    };
    // Funcion para registrar a un usuario
    $scope.registerUser = function(newUser) {

        if ((!newUser.name) && (!newUser.username) && (!newUser.email) && (!newUser.p1)&&(!newUser.p2)&& (!newUser.gender)){


        }
        else if (!newUser.name){

        }

        else if (!newUser.username){


        }
        else if (!newUser.email){


        }
        else if (!newUser.p1){


        }
        else if (!newUser.p2){


        }
       else if (newUser.p1!=newUser.p2){
            $scope.alerts = [{
                type: 'danger',
                msg: 'Error los passwords no son iguales!'
            }];
      //      $scope.mensaje = "Error los passwords no son iguales";
        }


        else if (!city) {
            $scope.alerts = [{
                type: 'danger',
                msg: 'Error debes seleccionar una ciudad!'
            }];
        }
        else if (!college) {
            $scope.alerts = [{
                type: 'danger',
                msg: 'Error debes seleccionar una universidad!'
            }];

        }
        else if (!newUser.gender) {
            $scope.alerts = [{
                type: 'danger',
                msg: 'Error debes seleccionar un genero!'
            }];
          //  $scope.mensaje = "Error debes seleccionar un genero";

        }
        else if (!$scope.file) {
            $scope.alerts = [{
                type: 'danger',
                msg: 'Error debes elegir una imagen de perfil!'
            }];
          // swal("Opps!", "Debes elegir una imagen de perfil!", "error")
        }
        else{
            console.log (newUser);
            console.log (city);
            console.log (college);
            newUser.city= city;
            newUser.college =college;
            newUser.password=newUser.p1;
            newUser.p2="";
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