'use strict';
/** 
  * controller for Messages
*/
app.controller('InboxCtrl', function ($scope, $state, $http, $stateParams, $modal) {
    $scope.message={};
    var id= $stateParams.id;
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

    var u= $stateParams.user;
    $http.get('/messages/'+u).success(function (data) {
            $scope.messages = data;
            console.log (data);

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

});

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