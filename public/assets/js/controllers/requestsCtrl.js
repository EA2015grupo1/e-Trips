
'use strict'
app.controller('requestsCtrl',['$scope', '$state', '$http','$stateParams', function($scope, $state, $http,$stateParams) {
    $scope.toaster = {
        type: 'success',
        text: 'Solicitud Eliminada'
    };

    var user = {};
    var iduser= $stateParams.id;
    var u= $stateParams.user;
    $http.get('/requests/'+u).success(function (data) {
        $scope.users = data;
        if (data.length==1){
            $scope.m1= "Solicitud Pendiente";
        }
        else{
            $scope.m2= "Solicitudes Pendientes";
        }

     })
     .error(function (data) {
     console.log('Error: ' + data);
     });

    $scope.addFriend = function(idfriend, ufriend, idrequest) {
        console.log (idrequest);
        user.user= u;
        user._id = idfriend;


        $http.post('/addfriend', user)
            .success(function (data) {

            })
            .error(function (data) {

            })
        user={};
        user.user= ufriend;
        user._id= iduser;
        $http.post('/addfriend', user)
            .success(function (data) {

            })
            .error(function (data) {

            })
        $http.delete('/request/' + idrequest)
            .success(function(data) {

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        $state.go("app.friends", {
            user: u,
            id: iduser

        });
    };
    $scope.deleteRequest = function(idrequest) {
        swal({   title: "¿Estas seguro?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, Eliminar Solicitud!",
                closeOnConfirm: false },
            function() {
                $http.delete('/request/' + idrequest)
                    .success(function (data) {
                        swal("Eliminada", "Solictud Eliminada.", "success");
                        $state.go("app.requests", {
                            user: u,
                            id: iduser
                        },{reload: true});


                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });

            });

    };
    $scope.getProfile = function(id) {
        $state.go("app.profile-student", {
            user: u,
            id: id
        });

    };

}]);

/**
 * Created by Javi on 26/12/2015.
 */
