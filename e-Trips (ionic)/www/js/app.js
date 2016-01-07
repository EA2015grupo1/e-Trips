// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var idlogin;
var idstudent;
var _base = "http://192.168.1.183:3000";
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordovaOauth', 'ngCordova'])

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


    var _api = {

      login: function(user) {
        return $http.post(_base + '/user/login', user);
      },
      signup: function(user) {
        return $http.post(_base + '/user', user);
      },
      editUser: function(user) {
        return $http.put(_base + '/user/'+user._id, user);
      },
      getUser: function(id) {
        return $http.get(_base + '/user/', +id);
      },
      getCities: function() {
        return $http.get(_base + '/cities');
      },

    };
    return _api;
  }]).controller('loginCtrl', ['$rootScope', '$location', '$scope', '$cordovaOauth','API','$http', '$ionicModal', function($rootScope, $location, $scope, $cordovaOauth, api, $http, $ionicModal) {

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });


    $scope.login = {
      username: '',
      password: ''
    }
    $scope.loginUser = function() {

      if (($scope.login.username == '') && ($scope.login.password == '')) {
        $rootScope.toast('Campo username y password vacíos');
      }
      else if ($scope.login.username == '') {
        $rootScope.toast('Campo username vacío');
      }
      else if ($scope.login.password == '') {
        $rootScope.toast('Campo password vacío');
      }
      else {
        $rootScope.showLoading("Autenticando..");
        api.login($scope.login).success(function (data) {
           $location.path('side-menu21/page12');
          idlogin = data.user[0]._id;
          $rootScope.hideLoading();
        }).error(function (data) {
          $rootScope.hideLoading();
          $rootScope.toast('Usuario o password incorrecto');
        })
      }
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
    var city;
    var college;
    var gender;
    $scope.user = {
      name: '',
      username: '',
      email: '',
      password: '',
      city: '',
      college: '',
      gender: '',
      phone:''
    }

var username;
    $scope.genders = [
      {gender: "Hombre"},
      {gender: "Mujer"},
    ];

    $scope.register = function() {
      $location.path('/page3');
    }
    $http.get(_base+'/cities').success(function (data) {
      $scope.cities = data;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.cityitemselected = function (item) {
      city = item;
      console.log (city);
      $http.get(_base+'/colleges/' + item)
        .success(function(data) {
          $scope.colleges = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        })
    };
    $scope.collegeitemselected = function (item) {
      college = item;
      console.log (item);
    };

    $scope.genderitemselected = function (item) {
      gender = item;
      console.log (item);
    };

    $scope.registerUser = function() {

      if ((city ==null) && (college ==null)&&(gender==null)) {
        $rootScope.toast('Debes elegir una ciudad, una universidad y un género');
      }
      else if (city ==null) {
        $rootScope.toast('Debes elegir una ciudad');
      }
      else if (college == null) {
        $rootScope.toast('Debes elegir una universidad');
      }
      else if (gender == null) {
        $rootScope.toast('Debes elegir un género');
      }
      else {
        $scope.user.city = city;
        $scope.user.college = college;
        $scope.user.gender = gender;
        $rootScope.showLoading("Registrando..");
        api.signup($scope.user).success(function (data) {
          console.log (data);
          $scope.user.username = data.username;
          username = data.username;
          console.log (data);
          $scope.modal.show();
          $rootScope.hideLoading();
        }).error(function (data) {
          $rootScope.hideLoading();

        })

      }
    }

    $scope.addMedia = function() {

      navigator.camera.getPicture(uploadPhoto, function(message) {
          $rootScope.toast('Error al obtener la foto');
        },{
          quality: 50,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
      );

    }

    function uploadPhoto(imageURI) {
      var options = new FileUploadOptions();
      options.fileKey="file";
      options.fileName= "image.jpg";
      options.mimeType="image/jpg";

      var params = new Object();
      params.value1 = "test";
      params.value2 = "param";

      options.params = params;
      options.chunkedMode = false;

      var ft = new FileTransfer();
      ft.upload(imageURI, _base+"/users/upload/"+username, win, fail, options);
    }

    function win(r) {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
      $scope.modal.hide();
      $location.path('/page1');
    }

    function fail(error) {
      alert( error.code);
    }
    $scope.closeRegister = function() {
       $scope.modal.hide();
       $location.path('/page1');
    }

  }]).controller('posicionCtrl', function($scope, $cordovaGeolocation, $ionicLoading) {


  ionic.Platform.ready(function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    });

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var myLatlng = new google.maps.LatLng(lat, long);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      $scope.map = map;
      $ionicLoading.hide();
      google.maps.event.addListenerOnce($scope.map, 'idle', function(){

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: myLatlng
        });

        var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });

      });

    }, function (err) {
      $ionicLoading.hide();
      console.log(err);
    });
  });

}).controller('perfilCtrl', ['$rootScope', '$location', '$scope', '$http',  'API', function($rootScope, $location, $scope, $http, api) {

    $scope.user = {};
    $scope.selected = false;
    //var id= localStorage.getItem("id");
    console.log (idlogin);
// Funci�n que obtiene un objeto usuario conocido su id
    $http.get(_base+'/user/' + idlogin)
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

    $scope.editUser = function() {
      $location.path('/page2');
    }

}]).controller('perfil-studentCtrl', ['$rootScope', '$location', '$scope', '$http',  'API','$stateParams', function($rootScope, $location, $scope, $http, $stateParams) {
    console.log (idstudent);
// Funci�n que obtiene un objeto usuario conocido su id
    $http.get(_base+'/user/' + idstudent)
      .success(function(data) {
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

   /* $scope.editUser = function() {
      $location.path('/page2');
    }*/

  }]).controller('citiesCtrl', ['$rootScope', '$location', '$scope', 'API', function($rootScope, $location, $scope, api) {


  api.getCities().success(function (data) {
    $scope.cities = data;

  })
    .error(function (data) {
      console.log('Error: ' + data);
    });

    $scope.getCollege = function (item) {
      city = item;
      $location.path ('/page14');

    };


}]).controller('collegesCtrl', ['$rootScope', '$location', '$scope', 'API','$http', function($rootScope, $location, $scope, api,$http) {

    $http.get(_base+'/colleges/' + city)
      .success(function(data) {

        $scope.colleges = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })

}]).controller('girlsCtrl', ['$rootScope', '$location', '$scope', 'API','$http', function($rootScope, $location, $scope, api,$http) {
    var gender ="Mujer";
    $http.get(_base+'/gender-ionic/' + gender)
      .success(function(data) {
        console.log (data);
        $scope.girls = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })
    $scope.getProfile = function (item) {
      idstudent = item;
      $location.path ('/page16');

    };

}]).controller('boysCtrl', ['$rootScope', '$location', '$scope', 'API','$http', function($rootScope, $location, $scope, api,$http) {
    var gender ="Hombre";
    $http.get(_base+'/gender-ionic/' + gender)
      .success(function(data) {
        $scope.boys = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })
    $scope.getProfile = function (item) {
      console.log(item)
      idstudent = item;
      $location.path ('/page16');

    };

}]).controller('editarCtrl', ['$rootScope', '$location', '$scope', '$http',  'API', '$ionicModal',function($rootScope, $location, $scope, $http, api, $ionicModal) {
    var idput;
    $scope.user = {};
    $scope.selected = false;
    //var id= localStorage.getItem("id");
    console.log (idlogin);
    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
// Funci�n que obtiene un objeto usuario conocido su id
    $http.get(_base+'/user/' + idlogin)
      .success(function(data) {
        idput = data._id;
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

    var city;
    var college;
    var gender;
    $scope.user = {
      _id: '',
      name: '',
      username: '',
      email: '',
      password: '',
      city: '',
      college: '',
      gender: '',
      phone:''
    }

    var username;
    $scope.genders = [
      {gender: "Hombre"},
      {gender: "Mujer"},
    ];

    $http.get(_base+'/cities').success(function (data) {
      $scope.cities = data;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });
    $scope.cityitemselected = function (item) {
      city = item;
      console.log (city);
      $http.get(_base+'/colleges/' + item)
        .success(function(data) {
          $scope.colleges = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        })
    };
    $scope.collegeitemselected = function (item) {
      college = item;
      console.log (item);
    };
    $scope.genderitemselected = function (item) {
      gender = item;
      console.log (item);
    };

    $scope.editUser = function() {
      if ((city ==null) && (college ==null)&&(gender==null)) {
        $rootScope.toast('Debes elegir una ciudad, una universidad y un género');
      }
      else if (city ==null) {
        $rootScope.toast('Debes elegir una ciudad');
      }
      else if (college == null) {
        $rootScope.toast('Debes elegir una universidad');
      }
      else if (gender == null) {
        $rootScope.toast('Debes elegir un género');
      }
      else {
        $scope.user._id = idput;
        $scope.user.city = city;
        $scope.user.college = college;
        $scope.user.gender = gender;
        $rootScope.showLoading("Actualizando Perfil..");
        api.editUser($scope.user).success(function (data) {
          console.log (data);
          $scope.user.username = data.username;
          username = data.username;
          console.log (data);
          $scope.modal.show();
          $rootScope.hideLoading();
        }).error(function (data) {
          $rootScope.hideLoading();

        })

      }
    }

    $scope.addMedia = function() {

      navigator.camera.getPicture(uploadPhoto, function(message) {
          $rootScope.toast('Error al cargar la foto');
        },{
          quality: 50,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
      );

    }

    function uploadPhoto(imageURI) {
      var options = new FileUploadOptions();
      options.fileKey="file";
      options.fileName= "image.jpg";
      options.mimeType="image/jpg";

      var params = new Object();
      params.value1 = "test";
      params.value2 = "param";

      options.params = params;
      options.chunkedMode = false;

      var ft = new FileTransfer();
      ft.upload(imageURI, _base+"/api/users/upload/"+username, win, fail, options);
    }

    function win(r) {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
      $scope.modal.hide();
      $location.path('/page1');
    }

    function fail(error) {
      alert( error.code);
    }
    $scope.closeRegister = function() {
      $scope.modal.hide();
      $location.path('/page1');
    }




  }]);


