'use strict';
app.controller('commentCtrl', function ($scope, $stateParams, $http, $modal, $state) {
    var id = $stateParams.id;
    var idr = $stateParams.idr;
    var user ={};

    $http.get('/comments/'+idr).success(function (data) {
            $scope.comments = data;
            console.log (data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.doPost = function(text) {
        console.log (text);
        user.iduser= id;
        user.idr = idr;
        user.text = text


        $http.post('/addComment', user)
            .success(function (data) {
                $state.go("app.comments", {}, { reload: true });
            })
            .error(function (data) {

            })

    };
});
