'use strict'

app.factory("Students", function ($resource, $stateParams) {
    var c=  $stateParams.college;
    console.log ("COLEGIO: "+c);
    return $resource('/college/'+ $stateParams.college); //la url donde queremos consumir
});
app.controller('studentsCtrl',['$scope', '$state', '$http', 'ngTableParams','Students','$stateParams','$modal', '$cookieStore', function($scope, $state,$http, ngTableParams, Students,$stateParams, $modal, $cookieStore) {
    var user = {};
    $scope.message={};
    $scope.college = $stateParams.college;
    var c= $stateParams.college;
    var id= $stateParams.id;
    var u= $stateParams.user;
    $scope.load=function() {

        var params = {
            page: 1,
            count: 7
        };

        var settings = {
            total: 0,
            counts: [5, 10, 15],
            getData: function ($defer, params) {
                Students.get(params.url(), function (response) {
                    params.total(response.total);
                    $scope.tregistros = response.total;
                    $defer.resolve(response.results);
                });
            }
        };

        $scope.tableParams = new ngTableParams(params, settings);
    };
    $scope.open = function (size) {
        $scope.message.receiver = size;
        $scope.message.ids = id;
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                message: function () {
                    return $scope.message;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
          //  $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.addRequest = function(username) {
        user._id = id;
        user.username= username;
        $http.post('/addrequest', user)
            .success(function (data) {
                $('#request').show();
                $('#addfriend').hide();
            })
            .error(function (data) {

            })
    };

    $scope.getProfile = function(idstudent) {
        $cookieStore.put('idstudent', idstudent);
        $state.go("app.profile-student", {
            user: u,
            id: id
        });
    };


}]);

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, message) {
    $scope.user.receive = message.receiver;
    $scope.send = function (subject, text) {
        message.subject = subject,
        message.text = text;
         $http.post('/addmessage', message)
            .success(function (data) {
                $modalInstance.dismiss('cancel');
            })
            .error(function (data) {

            })
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

