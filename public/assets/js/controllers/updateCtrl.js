/**
 * Created by Javi on 05/12/2015.
 */
'use strict'
;
app.controller('updateCtrl',['$scope', '$state', '$http','$stateParams', function($scope, $state, $http,$stateParams) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;
    var id= $stateParams.id;
    $scope.cityselectedItem = "Ciudades";
    $scope.collegeselectedItem = "Universidades";
    var city;
    var college;
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
    }
    $scope.collegeitemselected = function (item) {
        college = item;
        $scope.collegeselectedItem = item;
        $http.get('/colleges/' + city)
            .success(function(data) {
                $scope.colleges = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    }


    // Funcion que obtiene un objeto usuario conocido su id
    $http.get('/user/' + id)
        .success(function(data) {
            $scope.user._id = data._id;
            $scope.user.username = data.username;
            $scope.user.name = data.name;
            $scope.user.email = data.email;
            $scope.user.password = data.password;
            $scope.user.phone = data.phone;
            $scope.user.gender = data.gender;
            if (data.college!=null & data.city!=null ){
                $scope.collegeselectedItem  = data.college;
                $scope.cityselectedItem  = data.city;
            }

            $scope.user.rol = data.rol;
            $scope.user.imageUrl = data.imageUrl;

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    // Funcion para editar los datos de un usuario
    $scope.updateUser = function(newUser, po, pr) {
        newUser.rol= $scope.user.rol;
        newUser.imageUrl= $scope.user.imageUrl;
        if ((!newUser.name) && (!newUser.username) && (!newUser.email) && (!newUser.p1)&&(!newUser.p2)&&(!newUser.gender)){
            $scope.user.n = "Nombre Completo es requerido";
            $scope.user.e = "Correo Electronico es requerido";
            $scope.user.u = "Usuario es requerido";
            $scope.user.p = "Password es requerido";
            $scope.user.ci = "El nombre de la ciudad es requerido";
            $scope.user.uni = "El nobmre de tu universidad es requerido";
            $scope.user.g = "Genero es requerido";

        }
        else if (!newUser.name){
            $scope.user.n = "Nombre Completo es requerido";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.p = "";
            $scope.user.g = "";

        }

        else if (!newUser.username){
            $scope.user.n = "";
            $scope.user.u = "Usuario es requerido";
            $scope.user.e = "";
            $scope.user.p = "";
            $scope.user.g = "";

        }
        else if (!newUser.email){
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "Correo Electronico es requerido";
            $scope.user.p = "";
            $scope.user.g = "";

        }
        else if (!newUser.p1){
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.g = "";
            $scope.user.p = "Password es requerido";

        }
        else if (!newUser.p2){
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.g = "";
            $scope.user.p = "Password es requerido";

        }

        else if (newUser.p1!=newUser.p2){
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.g = "";
            $scope.user.p = "";
            $('#login-error').show();
            $scope.mensaje = "Error los passwords no son iguales";

        }
        else if (!city&& !$scope.cityselectedItem) {
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.g = "";
            $scope.user.p = "";
            $scope.alerts = [{
                type: 'danger',
                msg: 'Error debes seleccionar una ciudad!'
            }];

        }
        else if (!college && ! $scope.collegeselectedItem) {
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.g = "";
            $scope.user.p = "";
            $scope.alerts = [{
                type: 'danger',
                msg: 'Error debes seleccionar una universidad!'
            }];

        }
        else if (!newUser.gender) {
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.g = "";
            $scope.user.p = "";
            $scope.alerts = [{
                type: 'danger',
                msg: 'Error debes seleccionar un genero!'
            }];

        }
        else if (!$scope.file) {
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.g = "";
            $scope.user.p = "";
            $scope.alerts = [{
                type: 'danger',
                msg: 'Error debes elegir una imagen de perfil!'
            }];
            // swal("Opps!", "Debes elegir una imagen de perfil!", "error")
        }


        else {
            newUser.password=newUser.p1;
            newUser.p2="";
            if (!city&&!college){
                newUser.city=$scope.cityselectedItem;
                newUser.college =$scope.collegeselectedItem;
            }
            else{
                newUser.city= city;
                newUser.college =college;
            }

            var formData = new FormData();
            var username = newUser.username;
            var file = $scope.file;
            formData.append("file", file);
            $http.put('/user/' + $scope.user._id, newUser)
                .success(function (data) {
                    $scope.users = data;
                   location.href = '#/app/home';
                   location.reload('#/app/home');

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

                location.href = '#/app/home';
                location.reload('#/app/home');

                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        }
    };

}]);