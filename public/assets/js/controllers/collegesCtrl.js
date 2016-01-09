app.controller('collegesCtrl', function ($scope, $stateParams, $http, $state) {
    var city=$stateParams.city;
    $http.get('/colleges/' + city)
        .success(function(data) {
            $scope.colleges = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        })
    // Funcion que borra un objeto ciudad conocido su id
    $scope.deleteCollege = function(id) {
        swal({   title: "¿Estas seguro?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminarla!",
                closeOnConfirm: false },
            function(isConfirm){
                if (isConfirm) {
                    $http.delete('/college/' + id)
                        .success(function (data) {
                            $scope.newUser = {};
                            swal("Eliminada", "Universidad Eliminada de e-Trips.", "success");
                            $state.go("admin.colleges", {}, { reload: true });
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                }
            });

    };
});
