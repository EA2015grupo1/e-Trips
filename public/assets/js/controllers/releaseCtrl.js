'use strict';
app.controller('releaseCtrl', function ($scope, $stateParams, $http, $modal, $state) {
    var id = $stateParams.id;
    var friend = $stateParams.friend;
    var u = $stateParams.user;
    var user ={};

    $http.get('/releases/'+friend).success(function (data) {
           $scope.releases = data;



        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.addComment = function(idr) {
        $state.go("app.comments", {
            user: u,
            id: id,
            friend: friend,
            idr: idr

        });
    };
    $scope.doPost = function(text) {
        console.log (text);
        user.user= friend;
        user.ids = id;
        user.text = text


        $http.post('/addRelease', user)
            .success(function (data) {
                $state.go("app.releases", {}, { reload: true });
            })
            .error(function (data) {

            })

    };
    $scope.goComments = function(idr) {
        $state.go("app.comments", {
            user: u,
            id: id,
            friend: friend,
            idr: idr

        });
    };
});
