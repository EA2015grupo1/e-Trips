/**
 * Created by Javi on 05/12/2015.
 */
'use strict'
app.factory("Users", function ($resource) {
    return $resource('/users'); //la url donde queremos consumir
});
app.controller('usersCtrl',['$scope', '$state', '$http', 'ngTableParams','Users','$stateParams', '$modal','$cookieStore',  function($scope, $state, $http, ngTableParams, Users, $stateParams, $modal,$cookieStore) {
    $scope.user = {};
    $scope.message={};
    $scope.selected = false;
    var u= $stateParams.user;
    var id = $stateParams.id;
    // Obtenemos todos los datos de la base de datos
    /*   $http.get('/api/users').success(function (data) {
     $scope.users = data;

     })
     .error(function (data) {
     console.log('Error: ' + data);
     });
     */
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
    var params = {
        page: 1,
        count: 7
    };

    var settings = {
        total: 0,
        counts: [5, 10, 15],
        getData: function($defer, params) {
            Users.get(params.url(), function(response) {
                params.total(response.total);
                $scope.tregistros= response.total;
                $defer.resolve(response.results);
            });
        }
    };

    $scope.tableParams = new ngTableParams(params, settings);


    // Funcion que borra un objeto usuario conocido su id
    $scope.deleteUser = function(id) {
        swal({   title: "¿Estas seguro?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminarlo!",
                closeOnConfirm: false },
            function(isConfirm){
                if (isConfirm) {
                    $http.delete('/user/' + id)
                        .success(function (data) {
                            $scope.newUser = {};
                            swal("Eliminado", "Usuario Eliminado de e-Trips.", "success");
                            $state.go("admin.home", {}, { reload: true });
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                }
            });

    };

    $scope.getProfile = function(idstudent) {
        $cookieStore.put('idstudent', idstudent);
        $state.go("admin.profile-student", {
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
