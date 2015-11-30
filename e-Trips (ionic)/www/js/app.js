// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordovaOauth'])

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
        return $http.post(_base + '/api/auth/signup', user);
      },
      getUser: function(id) {
        return $http.get(_base + '/api/users/', +id);
      },
      getTodos: function() {
        return $http.get(_base + '/api/users');
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
        $rootScope.hideLoading();
      }).error(function(data) {
        $rootScope.hideLoading();
        $rootScope.toast('Usuario o password incorrecto');
      })
    }
    $scope.twitterLogin = function() {
      $cordovaOauth.twitter("CLIENT_ID_HERE",  "CLIENT_SECRET_HERE").then(function(result) {
        console.log(JSON.stringify(result));
      }, function(error) {
        console.log(JSON.stringify(error));
      });
    }

    $scope.facebookLogin = function() {
      console.log ("hola");
      $cordovaOauth.facebook("CLIENT_ID_HERE", ["email"], {"auth_type": "rerequest"}).then(function (result) {
        console.log(JSON.stringify(result));
      }, function (error) {
        console.log(JSON.stringify(error));
      });
    }


  }]).controller('usuariosCtrl', ['$rootScope', '$location', '$scope', 'API', function($rootScope, $location, $scope, api) {


   api.getTodos().success(function (data) {
      $scope.users = data;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });
    $scope.getUser = function(id) {
      localStorage.setItem("id", id);
    };
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
        $scope.user.zipCode = data.zipCode;
        $scope.user.city = data.city;
        $scope.user.rol = data.rol;
        $scope.user.imageUrl = data.imageUrl;
        console.log (data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });


  }]);

