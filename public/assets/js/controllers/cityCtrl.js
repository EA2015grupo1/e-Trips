/**
 * Created by Javi on 05/12/2015.
 */
'use strict'

app.factory('MarkerCreatorService', function () {

    var markerId = 0;

    function create(latitude, longitude) {
        var marker = {
            options: {
                animation: 0,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'
            },
            latitude: latitude,
            longitude: longitude,
            id: ++markerId
        };
        return marker;
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    function createByCoords(latitude, longitude, successCallback) {
        var marker = create(latitude, longitude);
        invokeSuccessCallback(successCallback, marker);
    }

    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                alert("Unknown address: " + address);
            }
        });
    }

    function createByCurrentLocation(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
            alert('Unable to locate current position');
        }
    }

    return {
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation
    };

});
app.controller('cityCtrl',['MarkerCreatorService', '$scope', '$state','$http','toaster','$stateParams', function(MarkerCreatorService, $scope, $state ,$http,  toaster,$stateParams) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;
    var id= $stateParams.id;
    var user=$stateParams.user;
    $scope.cityselectedItem = "Ciudades";
    $scope.collegeselectedItem = "Universidades";
    $scope.collegeItem = "de una ciudad";
    $scope.toastercity = {
        type: 'error',
        title: 'Error',
        text: 'Debes seleccionar una ciudad'
    };
    $scope.toastercollege = {
        type: 'error',
        title: 'Error',
        text: 'Debes seleccionar una universidad'
    };



    var city;
    var college

    $http.get('/cities').success(function (data) {
            $scope.cities = data;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    $scope.cityitemselected = function (item) {
        $scope.collegeselectedItem = "Universidades";
        city = item;
        $scope.cityselectedItem = item;
        $scope.collegeItem = item;
        $http.get('/colleges/' + item)
            .success(function(data) {
                $scope.colleges = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })

        var address = city;
        if (address !== '') {
            MarkerCreatorService.createByAddress(address, function(marker) {
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };
    }

    $scope.collegeitemselected = function (item) {
        college = item;
        $scope.collegeselectedItem = item;
        $http.get('/colleges/' + city)
            .success(function(data) {
                $scope.colleges = data;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
        var address = college;
        if (address !== '') {
            MarkerCreatorService.createByAddress(address, function(marker) {
                marker.options.labelContent = address;
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        }
    };

    $scope.colleges_selected = function (city) {
        if (city=="Ciudades"){
            toaster.pop($scope.toastercity.type, $scope.toastercity.title, $scope.toastercity.text);
        }
        else {
            var colleges = {};
            $http.get('/colleges/' + city)
                .success(function (data) {
                    colleges = data;
                    var address = {};
                    for (var i = 0; i < colleges.length; i++) {
                        address = colleges[i].college;
                        MarkerCreatorService.createByAddress(address, function (marker) {
                            console.log (marker);
                            $scope.map.markers.push(marker);
                            refresh(marker);
                        });

                    }


                })
                .error(function (data) {
                    console.log('Error: ' + data);
                })

            // console.log (map.markers);
        }
    };
    $scope.students_selected = function (college) {
        if (college=="Universidades"){
            toaster.pop($scope.toastercollege.type, $scope.toastercollege.title, $scope.toastercollege.text);
        }
        else {
            $state.go("app.students", {
                user: user,
                id: id,
                college: college
            }, {reload: false});
            //location.href = '#/app/students/' + college;
            //location.reload('#/app/students/');

        }
    };
    $scope.see_colleges = function (city) {

            $state.go("admin.colleges", {
                user: user,
                id: id,
                city: city
            });

    };
    // Funcion que borra un objeto ciudad conocido su id
    $scope.deleteCity = function(id) {
        swal({   title: "¿Estas seguro?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminarla!",
                closeOnConfirm: false },
            function(isConfirm){
                if (isConfirm) {
                    $http.delete('/city/' + id)
                        .success(function (data) {
                            $scope.newUser = {};
                            swal("Eliminada", "Ciudad Eliminada de e-Trips.", "success");
                            $state.go("admin.cities", {}, { reload: true });
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                }
            });

    };
    MarkerCreatorService.createByCoords(40.454018, -3.509205, function (marker) {
        $scope.autentiaMarker = marker;
    });

    $scope.address = '';

    $scope.map = {
        center: {
            latitude: $scope.autentiaMarker.latitude,
            longitude: $scope.autentiaMarker.longitude
        },
        zoom: 11,
        markers: [],
        control: {},
        options: {
            scrollwheel: false
        }
    };

    $scope.map.markers.push($scope.autentiaMarker);


    MarkerCreatorService.createByCurrentLocation(function (marker) {
        marker.options.labelContent = 'Estas aqui';
        $scope.map.markers.push(marker);
        refresh(marker);
    });


    function refresh(marker) {
        $scope.map.control.refresh({
            latitude: marker.latitude,
            longitude: marker.longitude
        })
    }



}]);
