/**
 * Created by Javi on 05/12/2015.
 */
'use strict'
app.factory("Users", function ($resource) {
    return $resource('/api/users'); //la url donde queremos consumir
});
app.controller('usersCtrl',['$scope', '$location', '$cookies', '$cookieStore', '$http', 'ngTableParams','Users',  function($scope, $location,$cookies, $cookieStore, $http, ngTableParams, Users) {
    $scope.user = {};
    $scope.selected = false;

    // Obtenemos todos los datos de la base de datos
    /*   $http.get('/api/users').success(function (data) {
     $scope.users = data;

     })
     .error(function (data) {
     console.log('Error: ' + data);
     });
     */

    var params = {
        page: 1,
        count: 7
    };

    var settings = {
        total: 0,
        counts: [5, 10, 15],
        getData: function($defer, params) {
            Users.get(params.url(), function(response) {
                console.log (response);
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
            function(){
                $http.delete('/api/users/' + id)
                    .success(function(data) {
                        $scope.newUser = {};
                        location.href = '#/admin/usuarios';
                        location.reload('#/admin/usuarios');
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            });

    };
    // Funcion que obtiene un objeto usuario conocido su id
    $scope.getUser = function(id) {
        console.log (id);
        $cookieStore.put('id', id);
        $location.path ('/app/update');
    };
    $scope.getProfile = function(id) {
        console.log (id);
        $cookieStore.put('id', id);
        $location.path ('/app/profile');

    };

}]);
