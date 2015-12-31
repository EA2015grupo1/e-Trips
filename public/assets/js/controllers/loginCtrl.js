/**
 * Created by Javi on 05/12/2015.
 */
'use strict'
app.controller('loginCtrl',['$scope', '$state','$http', function($scope, $state, $http) {

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;
    $scope.cityselectedItem = "Ciudades";
    $scope.collegeselectedItem = "Universidades";
    var city;
    var college
    $http.get('/cities').success(function (data) {
            $scope.cities = data;

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    $scope.cityitemselected = function (item) {
        $scope.collegeselectedItem = "Universidades";
        city = item;
        $scope.cityselectedItem = item;
        $http.get('/colleges/' + item)
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
        $http.get('/colleges/' + city)
            .success(function(data) {
                $scope.colleges = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    };
    $scope.uploadFile = function() {
        var file = $scope.file;
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

            $http.post('/user/login', newUser)
                .success(function (data) {

                    var id= data.user[0]._id;
                    var user= data.user[0].username;
                   //  $cookieStore.put('id', data.user[0]._id);
                    // $cookieStore.put('conectado', data.user[0].username);
                    if (data.user[0].rol=="administrador") {
                        $state.go("admin.home", {
                            user: user,
                            id: id
                        });

                    }
                    else{
                        $state.go("app.home", {
                            user: user,
                            id: id
                        });

                    }

                })
                .error(function (data) {
                   // swal("Opps!", "Usuario o password incorrecto!", "error")
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Usuario o password incorrecto!'
                    }];


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

            newUser.city= city;
            newUser.college =college;
            newUser.password=newUser.p1;
            newUser.p2="";
            var formData = new FormData();
            var username = newUser.username;
            var file = $scope.file;
            formData.append("file", file);
            $http.post('/user', newUser)
                .success(function (data) {

                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

            $http.put('/upload/' + username, formData, {
                    headers: {
                        "Content-type": undefined
                    },
                    transformRequest: angular.identity
                }
                )
                .success(function (data) {

                    $state.go("app.signin");
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });


        }


    };


}]);