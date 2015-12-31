
'use strict'
app.controller('friendsCtrl',['$scope', '$state', '$http','$stateParams', function($scope, $state, $http,$stateParams) {

    var user = {};
    var iduser= $stateParams.id;
    var u= $stateParams.user;
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


    $scope.getProfile = function(id) {
        $state.go("app.profile-student", {
            id: id
        });

    };


}]);

/**
 * Created by Javi on 26/12/2015.
 */

