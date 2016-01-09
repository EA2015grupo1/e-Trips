'use strict'
app.controller('profileStudentCtrl', function ($scope,$http,$cookieStore,$stateParams, $state) {
    var idstudent = $cookieStore.get('idstudent');
    var id= $stateParams.id;
    var user= $stateParams.user;
    $http.get('/user/' + idstudent)
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
           // var idstudent = $cookieStore.remove('idstudent');


        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    $scope.SeeReleases = function (friend) {
        console.log ("IDFRIEND:"+friend);
        $state.go("app.releases", {
            user: user,
            id: id,
            friend: friend
        });
    };


});