
app.factory("Girls", function ($resource) {
    var girl = "Mujer";
    console.log("resource "+girl);
    return $resource('/gender/'+ girl); //la url donde queremos consumir
});
app.controller('girlCtrl',['$scope', '$state', '$http', 'ngTableParams','Girls','$stateParams','$modal','$cookieStore', function($scope, $state,$http, ngTableParams, Girls,$stateParams, $modal, $cookieStore) {
    var user = {};
    $scope.message={};
    var id= $stateParams.id;
    var u= $stateParams.user;



    $scope.load = function(){
        // Obtenemos todos los datos de la base de datos
        $http.get('/requests-send/'+id).success(function (s) {
                $http.get('/friends-user/'+id).success(function (f) {
                        var params = {
                            page: 1,
                            count: 7
                        };

                        var settings = {
                            total: 0,
                            counts: [5, 10, 15],
                            getData: function($defer, params) {
                                Girls.get(params.url(), function(response) {

                                    check(s,f, response.results, response);

                                });
                                check = function(requests, friends, users, response){
                                    var cont=0;
                                    for (var i=0; i<requests.length; i++){
                                        for (var j=0; j<users.length; j++){
                                            if (requests[i].username == users[j].username){
                                                console.log ("encontrado");
                                                cont++;
                                                s = users.splice(j, 1);
                                                break;
                                            }
                                        }

                                    }

                                    for (var i=0; i<friends.length; i++){
                                        for (var j=0; j<users.length; j++){
                                            if (friends[i].username == users[j].username){
                                                console.log ("encontrado");
                                                cont++;
                                                s = users.splice(j, 1);
                                                break;
                                            }
                                        }

                                    }
                                   console.log (cont);
                                    params.total(response.total-cont);
                                    $scope.tregistros= response.total-cont;
                                    $defer.resolve(users);
                                }




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
    $scope.ordenarPor = function(orden){
        $scope.ordenSeleccionado= orden;
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
        if(u!=username) {
            user._id = id;
            user.username = username;
            $http.post('/addrequest', user)
                .success(function (data) {
                })
                .error(function (data) {

                })
            $state.go("app.girls", {
                user: u,
                id: id
            }, {reload: true});
        }
        else{
            swal("Oops...", "No puedes ser amigo de ti mismo!", "warning");
        }
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

