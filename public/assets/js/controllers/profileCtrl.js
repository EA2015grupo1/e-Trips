'use strict'
app.controller('profileCtrl', ['$scope', '$sce', '$state',  '$http','$stateParams', function ($scope, $sce, $state, $http, $stateParams) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;
    var id = $stateParams.id;
    var user = $stateParams.user;

    $http.get('/messages/'+user).success(function (data) {
            $scope.messages = data;
            console.log (data);

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.getProfile = function () {
        $state.go("app.profile", {
            user: user,
            id: id
        });
    };
    $scope.Update = function () {
        $state.go("app.update", {
            user: user,
            id: id
        });
    };
    if (id == undefined) {

        $http.get('/user/provider/twitter')
            .success(function (data) {
                if (data != null) {
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

                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        $http.get('/user/provider/facebook')
            .success(function (data) {
                if (data != null) {
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



            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    $scope.salirUser = function () {
        $state.go("login.signin");
    };
}]);/**
 * Created by Javi on 26/12/2015.
 */
