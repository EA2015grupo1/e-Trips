'use strict'

app.factory("Students", function ($resource, $stateParams) {
    console.log("****************** STUDENTS!!!!!!", $stateParams);
    return $resource('/college/'+ $stateParams.college); //la url donde queremos consumir
});
app.controller('studentsCtrl',['$scope', '$state', '$http', 'ngTableParams','Students','$stateParams','$modal', '$cookieStore','$resource', function($scope, $state,$http, ngTableParams, Students,$stateParams, $modal, $cookieStore, $resource) {
    var user = {};
    $scope.message={};
    $scope.college = $stateParams.college;
    var c= $stateParams.college;
    var id= $stateParams.id;
    var u= $stateParams.user;
    var users={};
    $scope.load = function() {
        // Obtenemos todos los datos de la base de datos
        $http.get('/requests-send/'+id).success(function (requests) {
                $http.get('/friends-user/'+id).success(function (friends) {
                        Students = $resource('/college/'+ $stateParams.college);

                        var settings = {
                            total: 0,
                            counts: [5, 10, 15],
                            getData: function($defer, params) {
                                Students.get(params.url(), function(response) {
                                    users= response.results;
                                    var cont=0;
                                  //  check(s,f, response.results);
                                    for (var i=0; i<requests.length; i++){
                                        for (var j=0; j<response.total; j++){
                                            if (requests[i].username == users[j].username){
                                                cont++;
                                                console.log ("encontrado");
                                                users.splice(j, 1);
                                                break;
                                            }
                                        }

                                    }


                                    for (var i=0; i<friends.length; i++){
                                        console.log ("dentro");
                                       for (var j=0; j<response.total; j++){
                                           if (friends[i].username == users[j].username){
                                                cont++;
                                                console.log ("encontrado");
                                                users.splice(j, 1);
                                                break;
                                            }
                                        }

                                    }
                                    params.total(response.total-cont);
                                    $scope.tregistros= response.total-cont;
                                    $defer.resolve(users);

                                });



                            }
                        };

                        $scope.tableParams = new ngTableParams(params, settings);

                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }
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
        if(u!=username) {
            user._id = id;
            user.username = username;
            $http.post('/addrequest', user)
                .success(function (data) {

                })
                .error(function (data) {

                })
            $state.go("app.students", {
                user: u,
                id: id,
                college: c
            }, {reload: true});
        }
        else{
            swal("Oops...", "No puedes ser amigo de ti mismo!", "warning");
        }
    };
    var params = {
        page: 1,
        count: 7
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

