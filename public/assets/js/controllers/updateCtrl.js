/**
 * Created by Javi on 05/12/2015.
 */
'use strict'
app.controller('updateCtrl',['$scope', '$location', '$cookies', '$cookieStore', '$http', function($scope, $location,$cookies, $cookieStore, $http) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;
    var id = $cookieStore.get('id');


    // Funcion que obtiene un objeto usuario conocido su id
    $http.get('/api/users/' + id)
        .success(function(data) {
            $scope.user._id = data._id;
            $scope.user.username = data.username;
            $scope.user.name = data.name;
            $scope.user.email = data.email;
            $scope.user.password = data.password;
            $scope.user.phone = data.phone;
            $scope.user.gender = data.gender;
            $scope.user.college = data.college;
            $scope.user.city = data.city;
            $scope.user.rol = data.rol;
            $scope.user.imageUrl = data.imageUrl;
            console.log (data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    // Funcion para editar los datos de un usuario
    $scope.updateUser = function(newUser, po, pr) {
        newUser.rol= $scope.user.rol;
        newUser.imageUrl= $scope.user.imageUrl;
        console.log (newUser);
        console.log (newUser.po);
        console.log (newUser.pr);
        if ((!newUser.name) && (!newUser.username) && (!newUser.email) && (!newUser.po)&&(!newUser.pr)&& (!newUser.city)&& (!newUser.college)&&(!newUser.gender)){
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
            $scope.user.ci = "";
            $scope.user.uni = "";
            $scope.user.g = "";

        }

        else if (!newUser.username){
            $scope.user.n = "";
            $scope.user.u = "Usuario es requerido";
            $scope.user.e = "";
            $scope.user.p = "";
            $scope.user.ci = "";
            $scope.user.uni = "";
            $scope.user.g = "";

        }
        else if (!newUser.email){
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "Correo Electronico es requerido";
            $scope.user.p = "";
            $scope.user.ci = "";
            $scope.user.uni = "";
            $scope.user.g = "";

        }
        else if (!newUser.po){
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.ci = "";
            $scope.user.uni = "";
            $scope.user.g = "";
            $scope.user.p = "Password es requerido";

        }
        else if (!newUser.po){
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.ci = "";
            $scope.user.uni = "";
            $scope.user.g = "";
            $scope.user.p = "Password es requerido";

        }
        else if (!newUser.city){
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.ci = "El nombre de la ciudad es requerido";
            $scope.user.uni = "";
            $scope.user.g = "";
            $scope.user.p = "";

        }
        else if (!newUser.college){
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.ci = "";
            $scope.user.uni = "El nobmre de tu universidad es requerido";
            $scope.user.g = "";
            $scope.user.p = "";

        }
        else if (!newUser.gender){
            $scope.user.n = "";
            $scope.user.u = "";
            $scope.user.e = "";
            $scope.user.ci = "";
            $scope.user.uni = "";
            $scope.user.g = "Genero es requerido";
            $scope.user.p = "";

        }
        else if (newUser.po!=newUser.pr){

            swal("Opps!", "Los passwords no son iguales!", "error")
        }
        else if (!$scope.file){

            swal("Opps!", "Debes elegir una imagen de perfil!", "error")
        }


        else {
            newUser.password=newUser.po;
            newUser.pr="";

            var formData = new FormData();
            var username = newUser.username;
            var file = $scope.file;
            formData.append("file", file);
            $http.put('/api/users/' + $scope.user._id, newUser)
                .success(function (data) {
                    $scope.users = data;
                    console.log(data);
                    location.href = '#/app/home';
                    location.reload('#/app/home');
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

                    location.href = '#/app/profile';
                    location.reload('#/app/profile');
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        }
    };

}]);