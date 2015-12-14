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
app.controller('cityCtrl',['MarkerCreatorService', '$scope', '$location', '$cookies', '$cookieStore','$http','toaster', function(MarkerCreatorService, $scope, $location, $cookies, $cookieStore,$http,  toaster) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.selected = false;
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

    $http.get('/api/cities').success(function (data) {
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
        $http.get('/api/colleges/' + item)
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
        $http.get('/api/colleges/' + city)
            .success(function(data) {
                $scope.colleges = data;
                console.log (data);
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
            console.log (city);
            $http.get('/api/colleges/' + city)
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
            location.href = '#/app/students/' + college;
            location.reload('#/app/students/');
            // $location.url ('app/students/'+college);
        }
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
