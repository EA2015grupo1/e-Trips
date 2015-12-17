// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordovaOauth'])

  .run(function($ionicPlatform, $rootScope, $ionicLoading, $location, $timeout) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    $rootScope.authktd = false;

    $rootScope.showLoading = function(msg) {
      $ionicLoading.show({
        template: msg || 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    }

    $rootScope.hideLoading = function() {
      $ionicLoading.hide();
    };

    $rootScope.toast = function(msg) {
      $rootScope.showLoading(msg);
      $timeout(function() {
        $rootScope.hideLoading();
      }, 2999);
    };

  }).factory('API', ['$http', function($http) {

    var _base = "http://147.83.7.156:3000";
    var _api = {

      login: function(user) {
        return $http.post(_base + '/api/users/login', user);
      },
      signup: function(user) {
        return $http.post(_base + '/api/users', user);
      },
      getUser: function(id) {
        return $http.get(_base + '/api/users/', +id);
      },
      getTodos: function() {
        return $http.get(_base + '/api/allusers');
      },



    };
    return _api;
  }]).controller('loginCtrl', ['$rootScope', '$location', '$scope', '$cordovaOauth','API', function($rootScope, $location, $scope, $cordovaOauth, api) {

    $scope.login = {
      username: '',
      password: ''
    }
    $scope.loginUser = function() {
      $rootScope.showLoading("Autenticando..");
      api.login($scope.login).success(function(data) {
        $location.path('/page7');
       //$state.go('position',{},{reload:true});
        //$window.location.reload(true);
        $rootScope.hideLoading();

      }).error(function(data) {
        $rootScope.hideLoading();
        $rootScope.toast('Usuario o password incorrecto');
      })
    }
    $scope.twitterLogin = function() {
      $cordovaOauth.twitter("CLIENT ID",  "CLIENT SECRET").then(function(result) {
        console.log(JSON.stringify(result));
      }, function(error) {
        console.log(JSON.stringify(error));
      });
    }

    $scope.facebookLogin = function() {
      console.log ("hola");
      $cordovaOauth.facebook("CLIENT ID", ["email"], {"auth_type": "rerequest"}).then(function (result) {
        console.log(JSON.stringify(result));
      }, function (error) {
        console.log(JSON.stringify(error));
      });
    }


  }]).controller('MapCtrl', ['$rootScope', '$location', '$scope', 'API', function($rootScope, $location, $scope, api) {

console.log ("hola mapa");
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 16
    });
   // var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.

        navigator.geolocation.getCurrentPosition(function (pos) {
          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map,
            title: "My Location"
          });
        });

        $scope.map = map;
    console.log("El mapa ya esta aquí!")
 /*       infoWindow.setPosition(pos);
        infoWindow.setContent('Aqui estas campeon/a!!');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

*//*
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }

      google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        navigator.geolocation.getCurrentPosition(function(pos) {
          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map,
            title: "My Location"
          });
        });

        $scope.map = map;
      });
*/
    /* api.getTodos().success(function (data) {
       $scope.users = data;

     })
       .error(function (data) {
         console.log('Error: ' + data);
       });
     $scope.getUser = function(id) {
       localStorage.setItem("id", id);
     };*/

  }]).controller('perfilCtrl', ['$rootScope', '$location', '$scope', '$http',  'API', function($rootScope, $location, $scope, $http, api) {

    $scope.user = {};
    $scope.selected = false;
    var id= localStorage.getItem("id");
    console.log (id);
// Funci�n que obtiene un objeto usuario conocido su id
    $http.get('http://147.83.7.156:3000/api/users/' + id)
      .success(function(data) {
        $scope.user._id = data._id;
        $scope.user.username = data.username;
        $scope.user.name = data.name;
        $scope.user.email = data.email;
        $scope.user.phone = data.phone;
        $scope.user.gender = data.gender;
        $scope.user.college = data.college;
        $scope.user.city = data.city;
        $scope.user.rol = data.rol;
        $scope.user.imageUrl = data.imageUrl;
        console.log (data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    $scope.deleteUser = function() {

      $rootScope.showLoading("Eliminando..");
      $http.delete('http://147.83.7.156:3000/api/users/' + id)
        .success(function(data)  {
         $location.path('/page7');
        $rootScope.hideLoading();
      }).error(function(data) {
        $rootScope.hideLoading();

      })
    }


  }]).controller('registroCtrl', ['$rootScope', '$location', '$scope', '$cordovaOauth','API', function($rootScope, $location, $scope, $cordovaOauth, api) {

    $scope.user = {
      name: '',
      username: '',
      email: '',
      password: '',
      city:'',
      college:'',
      gender:'',
      phone:''
    }
    $scope.registerUser = function() {

      $rootScope.showLoading("Registrando..");
      api.signup($scope.user).success(function(data) {
        $location.path('/page1');
        $rootScope.hideLoading();
      }).error(function(data) {
        $rootScope.hideLoading();

      })
    }



  }]);

