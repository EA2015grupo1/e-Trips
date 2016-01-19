'use strict'

app.controller('profileCtrl', ['$scope', '$sce', '$state',  '$http','$stateParams','$cookieStore', function ($scope, $sce, $state, $http, $stateParams, $cookieStore) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;
    var id = $stateParams.id;
    var user = $stateParams.user;
    var u;

    $scope.getProfileRegister = function () {
        $state.go("app.profile", {
            user: user,
            id: id
        });
    };
    $scope.getProfileAdmin = function () {
        $state.go("admin.profile", {
            user: user,
            id: id
        });
    };
    $scope.UpdateAdmin = function () {
        console.log ("hola admin update");
       $state.go("admin.update", {
            user: user,
            id: id
        });
    };
    $scope.UpdateRegister = function () {
        $state.go("app.update", {
            user: user,
            id: id
        });
    };
    $scope.seeReleases = function () {
        $state.go("app.releases", {
            user: user,
            id: id,
            friend: user
        });
    };


    $scope.getMessages = function () {

        $state.go("app.messages", {
            user: user,
            id: id
        });
    };
    if (id == undefined) {

        $http.get('/user/provider/twitter')
            .success(function (data) {
                console.log (data);
                if (data != null) {
                    $state.go("app.home", {
                        user: data.username,
                        id: data._id
                    }, {reload: true});
                    user= data.username;
                    id=  data._id;
                    $scope.user._id = data._id;
                    $scope.user.username = data.username;
                    $scope.user.name = data.name;
                    $scope.user.email = data.email;
                    $scope.user.phone = data.phone;
                    $scope.user.gender = data.gender;
                    $scope.user.college = data.college;
                    $scope.user.city = data.city;
                    $scope.user.rol = data.rol;
                    $scope.user.imageUrl = data.imageUrl;

                    $http.get('/messages/'+data.username).success(function (data) {
                        $scope.messages = data;
                        console.log (data);

                    })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });

                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        $http.get('/user/provider/facebook')
            .success(function (data) {
                if (data != null) {
                    user= data.username;
                    id=  data._id;
                    $scope.user._id = data._id;
                    $scope.user.username = data.username;
                    $scope.user.name = data.name;
                    $scope.user.email = data.email;
                    $scope.user.phone = data.phone;
                    $scope.user.gender = data.gender;
                    $scope.user.college = data.college;
                    $scope.user.city = data.city;
                    $scope.user.rol = data.rol;
                    $scope.user.imageUrl = data.imageUrl;
                    $http.get('/messages/'+data.username).success(function (data) {
                        $scope.messages = data;
                        console.log (data);

                    })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }
    else {
        // Funcion que obtiene un objeto usuario conocido su id
        $http.get('/user/' + id)
            .success(function (data) {

                $scope.user._id = data._id;
                $scope.user.username = data.username;
                $scope.user.name = data.name;
                $scope.user.email = data.email;
                $scope.user.phone = data.phone;
                $scope.user.gender = data.gender;
                $scope.user.college = data.college;
                $scope.user.city = data.city;
                $scope.user.rol = data.rol;
                $scope.user.imageUrl = data.imageUrl;
                $http.get('/messages/'+user).success(function (data) {
                    $scope.messages = data;
                    console.log (data);

                })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });


            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    $scope.salirUser = function () {
        var socket = io.connect('http://localhost:3000', { 'forceNew': true });
        socket.emit('exit', user, function (data) {
        });
        $state.go("login.signin");
    };
}]);/**
 * Created by Javi on 26/12/2015.
 */
