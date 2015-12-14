/**
 * Created by Javi on 14/12/2015.
 */
'use strict'
app.controller('profile-studentCtrl', ['$scope', '$sce', '$location', '$cookies', '$cookieStore', '$http', function ($scope, $sce, $location, $cookies, $cookieStore, $http) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;
    var id = $cookieStore.get('id');


        // Funcion que obtiene un objeto usuario conocido su id
        $http.get('/api/users/' + id)
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
                console.log(data);


            })
            .error(function (data) {
                console.log('Error: ' + data);
            });


}]);
