
'use strict'
app.controller('friendsCtrl',['$scope', '$state', '$http','$stateParams','$cookieStore', function($scope, $state, $http,$stateParams,$cookieStore) {

    var user = {};
    var u= $stateParams.user;
    var id= $stateParams.id;
    $http.get('/friends/'+u).success(function (data) {
            $scope.users = data;
            if (data.length==1){
                $scope.m1= "Amigo";
            }
            else{
                $scope.m2= "Amigos";
            }
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });


    $scope.getProfile = function(idstudent) {
        $cookieStore.put('idstudent', idstudent);
        $state.go("app.profile-friend", {
            user: u,
            id: id
        });

    };


}]);

/**
 * Created by Javi on 26/12/2015.
 */

