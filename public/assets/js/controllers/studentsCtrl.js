/**
 * Created by Javi on 05/12/2015.
 */
'use strict'
var college;
app.factory("Users", function ($resource, $stateParams) {
    college = $stateParams.college;
    return $resource('/api/users/college/'+ $stateParams.college); //la url donde queremos consumir
});
app.controller('studentsCtrl',['$scope', '$location', '$cookies', '$cookieStore', '$http', 'ngTableParams','Users', function($scope, $location,$cookies, $cookieStore, $http, ngTableParams, Users) {
    $scope.user = {};
    $scope.college = college;
    $scope.selected = false;

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

    $scope.getProfile = function(id) {
        console.log (id);
        $cookieStore.put('id', id);
        $location.path ('/app/profile-student');

    };


}]);

