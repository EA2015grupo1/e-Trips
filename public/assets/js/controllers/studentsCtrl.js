'use strict'

app.factory("Students", function ($resource, $stateParams) {
    console.log("****************** STUDENTS!!!!!!", $stateParams);
    return $resource('/college/'+ $stateParams.college); //la url donde queremos consumir
});
app.controller('studentsCtrl',['$scope', '$state', '$http', 'ngTableParams','Students','$stateParams','$modal', '$cookieStore','$resource', function($scope, $state,$http, ngTableParams, Students,$stateParams, $modal, $cookieStore, $resource) {
    var user = {};
    $scope.message={};
    $scope.college = $stateParams.college;
    var id= $stateParams.id;
    var u= $stateParams.user;

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
    var params = {
        page: 1,
        count: 7
    };
    $scope.load = function() {
        console.log ("111111111111111111111111");

        Students = $resource('/college/'+ $stateParams.college);

        var settings = {
            total: 0,
            counts: [5, 10, 15],
            getData: function ($defer, params) {
                console.log ("********************************",params);
                Students.get(params.url(), function (response) {
                    params.total(response.total);
                    $scope.tregistros = response.total;
                    $defer.resolve(response.results);
                });
            }
        };
        console.log ("2222222222222222222222222222");

        $scope.tableParams = new ngTableParams(params, settings);
    }
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

