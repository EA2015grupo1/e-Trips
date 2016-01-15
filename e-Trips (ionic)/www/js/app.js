// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var socket = io.connect('http://147.83.7.156:3000', { 'forceNew': true });
var _base = "http://147.83.7.156:3000";
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
      getUser: function(iduser) {
        return $http.get(_base + '/user/' +iduser);
      },
      getCities: function() {
        return $http.get(_base + '/cities');
      },
      getStudents: function (college) {
        return $http.get (_base + '/college-ionic/'+college);
      },
      addrequest: function (user) {
        return $http.post (_base + '/addrequest/', user);
      },
      getrequests: function (user) {
        return $http.get (_base + '/requests/'+user);
      },
      addfriend: function (user) {
        return $http.post (_base + '/addfriend/',user);
      },
      deleterequest: function (idrequest) {
        return $http.delete (_base + '/request/'+idrequest);
      },
      getfriends: function (user) {
        return $http.get (_base + '/friends/'+user);
      },
      getMessage: function (user) {
        return $http.get (_base + '/chat/');
      },
      getColleges: function (item) {
        return $http.get (_base + '/colleges/' +item);
      },
      getCities: function () {
        return $http.get (_base + '/cities/');
      },
      getGirls: function () {
        return $http.get (_base + '/gender-ionic/Mujer');
      },
      getBoys: function () {
        return $http.get (_base + '/gender-ionic/Hombre');
      },




    };
    return _api;
  }]).controller('loginCtrl', ['$rootScope', '$state', '$scope', '$cordovaOauth','API','$http', '$ionicModal', function($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal) {


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
        var user={};
        $rootScope.showLoading("Autenticando..");
        api.login($scope.login).success(function (data) {
          window.localStorage['idlogin'] = data.user[0]._id;
          window.localStorage['user'] = data.user[0].username;
          window.localStorage['city'] = data.user[0].city;
          window.localStorage['imageUrl'] = data.user[0].imageUrl;
          user.id = data.user[0]._id;
          user.imageUrl = data.user[0].imageUrl;
          user.user = data.user[0].username;
          user.city = data.user[0].city;
          socket.emit('newUser', user, function (data) {

          });
          $state.go("menu.posicion");
          $rootScope.hideLoading();
        }).error(function (data) {
          $rootScope.hideLoading();
          $rootScope.toast('Usuario o password incorrecto');
        })
      }
    }

/*    $scope.twitterLogin = function() {
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
    }*/


    $scope.register = function() {
      $state.go("registro");
    }


  }]).controller('registerCtrl', ['$rootScope', '$state', '$scope', '$cordovaOauth','API','$http', '$ionicModal', function($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal) {

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });




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

    api.getCities().success(function (data) {
      $scope.cities = data;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.cityitemselected = function (item) {
      city = item;
      console.log (city);
      api.getColleges(item).success(function (data) {
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
    $state.go("login");
    }

  }]).controller('chatCtrl', ['$rootScope', '$state', '$scope', '$cordovaOauth','API','$http', '$ionicModal', function($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal) {

    var id = window.localStorage['idlogin'];
    $scope.id = id;
    var u = window.localStorage['user'];
    var city = window.localStorage['city'];
    var imageUrl = window.localStorage['imageUrl'];
    var user={};
    var users={};
    $scope.message={};
    $scope.user = {
      _id: id

    };

    $scope.messages =[];
    socket.on('newMessage', function(data){
      $scope.$apply(function(){
        $scope.messages.push(data);
      });

    })

    socket.on('usernames', function(data){
          console.log (data);
          users = data;
          for (var i=0; i<users.length; i++){
            if (users[i].user == u){
              console.log ("encontrado");
              users.splice(i, 1);
              break;
            }
          }
          $scope.$apply(function(){
              $scope.online = users;
          });

    });


   //Obtenemos todos los datos de la base de datos
    $http.get('http://147.83.7.156:3000/chat').success(function (data) {
      $scope.messages = data;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.sendMessage = function(sendMessageForm) {
      user.message = $scope.text;
      user.date = new Date();
      user.id = id;
      user.user = u;
      user.city = city;
      user.imageUrl = imageUrl;
      if ($scope.text) {
        socket.emit('sendMessage', user);
        $scope.text = '';
       $http.post('http://147.83.7.156:3000/addchat', user)
          .success(function (data) {

          })
          .error(function (data) {

          })
      }

    };

    var newUser = {};



  }]).controller('chatCtrl', ['$rootScope', '$state', '$scope', '$cordovaOauth','API','$http', '$ionicModal', function($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal) {

    var id = window.localStorage['idlogin'];
    $scope.id = id;
    var u = window.localStorage['user'];
    var city = window.localStorage['city'];
    var imageUrl = window.localStorage['imageUrl'];
    var user={};
    var users={};
    $scope.message={};
    $scope.user = {
      _id: id

    };

    $scope.messages =[];
    socket.on('newMessage', function(data){
      $scope.$apply(function(){
        $scope.messages.push(data);
      });

    })

    socket.on('usernames', function(data){
      console.log (data);
      users = data;
      for (var i=0; i<users.length; i++){
        if (users[i].user == u){
          console.log ("encontrado");
          users.splice(i, 1);
          break;
        }
      }
      $scope.$apply(function(){
        $scope.online = users;
      });

    });


    //Obtenemos todos los datos de la base de datos
    $http.get('http://147.83.7.156:3000/chat').success(function (data) {
      $scope.messages = data;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.sendMessage = function(sendMessageForm) {
      user.message = $scope.text;
      user.date = new Date();
      user.id = id;
      user.user = u;
      user.city = city;
      user.imageUrl = imageUrl;
      if ($scope.text) {
        socket.emit('sendMessage', user);
        $scope.text = '';
        $http.post('http://147.83.7.156:3000/addchat', user)
          .success(function (data) {

          })
          .error(function (data) {

          })
      }

    };

    var newUser = {};



  }]).controller('onlineCtrl', ['$rootScope', '$state', '$scope', '$cordovaOauth','API','$http', '$ionicModal', function($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal) {

    var u = window.localStorage['user'];

    var users={};


    socket.emit('getUsers', function (data) {

    });
    socket.on('usernames', function(data){
      console.log (data);
      users = data;
      for (var i=0; i<users.length; i++){
        if (users[i].user == u){
          console.log ("encontrado");
          users.splice(i, 1);
          break;
        }
      }
      $scope.$apply(function(){
        $scope.online = users;
      });

    });




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

}).controller('perfilCtrl', ['$rootScope', '$state', '$scope', '$http',  'API',  function($rootScope, $state, $scope, $http, api) {
    var id = window.localStorage['idlogin'];

    $scope.goBack = function() {
      $state.go("menu.posicion");
    };

    api.getUser(id).success(function (data) {
      $scope.username = data.username;
      $scope.name = data.name;
      $scope.email = data.email;
      $scope.phone = data.phone;
      $scope.gender = data.gender;
      $scope.college = data.college;
      $scope.city = data.city;
      $scope.rol = data.rol;
      $scope.imageUrl = data.imageUrl;


    }).error(function (data) {

    })
    $scope.seeProfile = function() {
      $state.go("profile", {
        id: id
      })
    }

    $scope.editUser = function() {
      $state.go("editar", {
        id: id
      })
    }

}]).controller('citiesCtrl', ['$rootScope', '$state', '$scope', 'API', function($rootScope, $state, $scope, api) {


  api.getCities().success(function (data) {
    $scope.cities = data;

  })
    .error(function (data) {
      console.log('Error: ' + data);
    });

    $scope.getCollege = function (item) {
      $state.go("colleges", {
        city: item
      });

    };


}]).controller('collegesCtrl', ['$rootScope', '$state', '$scope', 'API','$http','$stateParams', '$ionicHistory', function($rootScope, $state, $scope, api,$http,$stateParams, $ionicHistory) {

    var city=  $stateParams.city;
    $scope.goBack = function() {
      $state.go("menu.cities");
    };
    api.getColleges(city).success(function (data) {

        $scope.colleges = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })
    $scope.getStudents = function (item) {
      $state.go ("students", {
        city: city,
        college: item

      });

    };

}]).controller('girlsCtrl', ['$rootScope', '$state', '$scope', 'API','$http', function($rootScope, $state, $scope, api,$http) {
    api.getGirls().success(function (data) {
        console.log (data);
        $scope.girls = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })
    $scope.getProfile = function (id) {
      $state.go("perfil-student", {
        id: id
      });

    };

}]).controller('boysCtrl', ['$rootScope', '$state', '$scope', 'API','$http', function($rootScope, $state, $scope, api,$http) {

    api.getBoys().success(function (data) {
        $scope.boys = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })
    $scope.getProfile = function (id) {
      $state.go("perfil-student", {
        id: id
      });

    };

}]).controller('perfil-studentCtrl', ['$rootScope', '$state', '$scope', '$http',  'API','$stateParams', function($rootScope, $state, $scope, $http, api, $stateParams) {
    var iduser= $stateParams.id;
    var college = $stateParams.college;
    var city = $stateParams.city;

    api.getUser(iduser).success(function (data) {
      $scope.username = data.username;
      $scope.name = data.name;
      $scope.email = data.email;
      $scope.phone = data.phone;
      $scope.gender = data.gender;
      $scope.college = data.college;
      $scope.city = data.city;
      $scope.rol = data.rol;
      $scope.imageUrl = data.imageUrl;


    }).error(function (data) {

    })

    $scope.goBack = function() {
      $state.go("students", {
        city: city,
        college: college
      })
    };
    var user = {};
    $scope.addRequest = function (username) {
      var id = window.localStorage['idlogin'];
      console.log (id);
      console.log (username);
      user._id = id;
      user.username= username;
      api.addrequest(user).success(function (data) {

      }).error(function (data) {

      })
    };

  }]).controller('perfil-requestCtrl', ['$rootScope', '$state', '$scope', '$http',  'API','$stateParams', function($rootScope, $state, $scope, $http, api, $stateParams) {
    var iduser= $stateParams.id; //id de paula

    api.getUser(iduser).success(function (data) {

      console.log (data._id);
      console.log (data.username);

      $scope.username = data.username;
      $scope.name = data.name;
      $scope.email = data.email;
      $scope.phone = data.phone;
      $scope.gender = data.gender;
      $scope.college = data.college;
      $scope.city = data.city;
      $scope.rol = data.rol;
      $scope.imageUrl = data.imageUrl;


    }).error(function (data) {

    })
    var user ={};
    $scope.addFriend = function(username) {
      var u = window.localStorage['user'];
      user.user = u;
      user._id = iduser;

      api.addfriend(user).success(function (data) {

      }).error(function (data) {

      })
      user = {};
      var idlogin = window.localStorage['idlogin'];
      user.user = username;
      user._id = idlogin;
      api.addfriend(user).success(function (data) {

      }).error(function (data) {

      })
      var idrequest = window.localStorage['idrequest'];

      api.deleterequest(idrequest).success(function (data) {

      }).error(function (data) {

      })


       $state.go("menu.friends");
    }
    $scope.deleteRequest = function () {
      var idrequest = window.localStorage['idrequest'];
      $rootScope.showLoading("Eliminado Solicitud..");
      api.deleterequest(idrequest).success(function (data) {
        $rootScope.hideLoading();
        $rootScope.toast('Solicitud Eliminada!');
        $state.go ("menu.posicion");
      }).error(function (data) {

      })
    };

  }]).controller('requestsCtrl', ['$rootScope', '$state', '$scope', 'API','$stateParams', function($rootScope, $state, $scope, api, $stateParams) {

    var id = window.localStorage['idlogin'];
    var u = window.localStorage['user'];
    api.getrequests(u).success(function (data) {
      $scope.users = data;
      window.localStorage['idrequest'] = data[0]._id;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.getStudent = function (id) {
      $state.go("perfil-request", {
        id: id
      })
    }



  }]).filter('nl2br', ['$filter',
    function($filter) {
      return function(data) {
        if (!data) return data;
        return data.replace(/\n\r?/g, '<br />');
      };
    }
  ]).controller('friendsCtrl', ['$rootScope', '$state', '$scope', 'API','$stateParams', function($rootScope, $state, $scope, api, $stateParams) {

    var id = window.localStorage['idlogin'];
    var u = window.localStorage['user'];
    api.getfriends(u).success(function (data) {
      $scope.users = data;


    })
      .error(function (data) {
        console.log('Error: ' + data);
      });


  }]).controller('studentsCtrl', ['$rootScope', '$state', '$scope', 'API','$stateParams', function($rootScope, $state, $scope, api, $stateParams) {

    var college = $stateParams.college;
    var city = $stateParams.city;

    $scope.goBack = function() {
      $state.go("colleges", {
        city: city
      })
    };

    api.getStudents(college).success(function (data) {
      $scope.users = data;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.getStudent = function (id) {
      $state.go("perfil-student", {
        city: city,
        college: college,
        id: id
      })
    }


  }]).controller('editarCtrl', ['$rootScope', '$state', '$scope', '$http',  'API', '$ionicModal', '$stateParams', function($rootScope, $state, $scope, $http, api, $ionicModal, $stateParams) {
    var idput;
    $scope.user = {};
    $scope.selected = false;
    var id= $stateParams.id;
    var u= $stateParams.user;
    $scope.goBack = function() {
      $state.go("profile");
    };

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
// Funci�n que obtiene un objeto usuario conocido su id
    $http.get(_base+'/user/' + id)
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


