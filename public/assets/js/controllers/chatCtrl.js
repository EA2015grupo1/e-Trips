'use strict';
/**
 * controller for Messages
 */
var socket = io.connect('http://localhost:3000', { 'forceNew': true });
app.controller('chatCtrl', function ($scope, $stateParams, $http, $modal) {
    var id= $stateParams.id;
    var u= $stateParams.user;
    var user={};
    var users={};
    $scope.message={};
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
    $http.get('/user/' + id)
        .success(function (data) {
            user.imageUrl = data.imageUrl;
            user.user = u;
            user.city = data.city;
            user.email = data.email;
            user.college = data.college;
            socket.emit('newUser', user, function (data) {

            });
            socket.on('usernames', function(data){
                users = data;
                for (var i=0; i<users.length; i++){
                    if (users[i].user == u){
                        console.log ("encontrado");
                        users.splice(i, 1);
                        break;
                    }
                }
                $scope.online = users;

            });

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });


    //Obtenemos todos los datos de la base de datos
     $http.get('/chat').success(function (data) {
         $scope.users = data;

     })
     .error(function (data) {
     console.log('Error: ' + data);
     });


    $scope.users =[];

    $scope.sendMessage = function(sendMessageForm) {
        user.message = $scope.text;
        user.date = new Date();
        if ($scope.text) {
            socket.emit('sendMessage', user);
            $scope.text = '';
            $http.post('/addchat', user)
                .success(function (data) {

                })
                .error(function (data) {

                })
        }


    };

        socket.on('newMessage', function(data){
            $scope.$apply(function () {
                $scope.users.push(data);
                console.log ($scope.users);
            });
        });


});
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, message) {
    $scope.user.receive = message.receiver;
    $scope.send = function () {
        message.subject = $scope.subject;
        message.text = $scope.text;
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
