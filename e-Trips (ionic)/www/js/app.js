// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var socket = io.connect('http://localhost:3000', {'forceNew': true});
var _base = "http://localhost:3000";
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordovaOauth', 'ngCordova'])

  .run(function ($ionicPlatform, $rootScope, $ionicLoading, $location, $timeout) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    $rootScope.authktd = false;

    $rootScope.showLoading = function (msg) {
      $ionicLoading.show({
        template: msg || 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    }

    $rootScope.hideLoading = function () {
      $ionicLoading.hide();
    };

    $rootScope.toast = function (msg) {
      $rootScope.showLoading(msg);
      $timeout(function () {
        $rootScope.hideLoading();
      }, 2999);
    };

  }).factory('API', ['$http', function ($http) {


    var _api = {

      login: function (user) {
        return $http.post(_base + '/user/login', user);
      },
      signup: function (user) {
        return $http.post(_base + '/user', user);
      },
      editUser: function (user) {
        return $http.put(_base + '/user/' + user._id, user);
      },
      getUser: function (iduser) {
        return $http.get(_base + '/user/' + iduser);
      },
      getCities: function () {
        return $http.get(_base + '/cities');
      },
      getStudents: function (college) {
        return $http.get(_base + '/college-ionic/' + college);
      },
      addrequest: function (user) {
        return $http.post(_base + '/addrequest/', user);
      },
      getrequests: function (user) {
        return $http.get(_base + '/requests/' + user);
      },
      addfriend: function (user) {
        return $http.post(_base + '/addfriend/', user);
      },
      deleterequest: function (idrequest) {
        return $http.delete(_base + '/request/' + idrequest);
      },
      getfriends: function (user) {
        return $http.get(_base + '/friends/' + user);
      },
      getMessage: function (user) {
        return $http.get(_base + '/chat/');
      },
      getColleges: function (item) {
        return $http.get(_base + '/colleges/' + item);
      },
      getCities: function () {
        return $http.get(_base + '/cities/');
      },
      getGirls: function () {
        return $http.get(_base + '/gender-ionic/Mujer');
      },
      getBoys: function () {
        return $http.get(_base + '/gender-ionic/Hombre');
      },
      sendMessage: function (message) {
        return $http.post(_base + '/addMessage/', message);
      },
      getCity: function (city) {
        return $http.get(_base + '/city/' + city);

      },
      findmessages: function (user) {
        return $http.get(_base + '/messages/' + user);
      },

      getReleases: function (friend) {
        return $http.get(_base + '/releases/' + friend);
      },
      addRelease: function (user) {
        return $http.post(_base + '/addRelease', user);
      },
      getComments: function (idr) {
        return $http.get(_base + '/comments/' + idr);
      },
      addComment: function (user) {
        return $http.post(_base + '/addcomment', user);
      },
      getRequestsSend: function (id) {
        return $http.get(_base + '/requests-send/' + id);
      },
      getFriendsUser: function (id) {
        return $http.get(_base + '/friends-user/' + id);
      },
      signup_twitter: function (user) {
        return $http.post(_base + '/user-twitter', user);
      },

    };
    return _api;
  }]).controller('loginCtrl', ['$rootScope', '$state', '$scope', '$cordovaOauth', 'API', '$http', '$ionicModal','$ionicHistory', function ($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal,$ionicHistory) {


    $scope.login = {
      username: '',
      password: ''
    }
    $scope.loginUser = function () {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory()
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
        var user = {};
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

    $scope.twitterLogin = function () {
      $cordovaOauth.twitter("zjFLYrlA6HopiEMIJGVFHAITV", "gWaQn8yOI010z9v3b5bznEqN9QzXYZu1O8bJSRk8gCCAncj2HF").then(function (user) {
        api.signup_twitter(user).success(function (data) {
          window.localStorage['idlogin'] = data._id;
          window.localStorage['user'] = data.username;
        }).error(function (data) {
        })
        $state.go('menu.posicion');
      }, function (error) {
        console.log(JSON.stringify(error));
      });
    };
    /*
     $scope.facebookLogin = function() {
     console.log ("hola");
     $cordovaOauth.facebook("CLIENT ID", ["email"], {"auth_type": "rerequest"}).then(function (result) {
     console.log(JSON.stringify(result));
     }, function (error) {
     console.log(JSON.stringify(error));
     });
     }*/


    $scope.register = function () {
      $state.go("registro");
    }


  }]).controller('registerCtrl', ['$rootScope', '$state', '$scope', '$cordovaOauth', 'API', '$http', '$ionicModal', function ($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal) {

  $scope.goBack = function () {
    $state.go("login");
  };
  $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
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
      phone: ''
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
      console.log(city);
      api.getColleges(item).success(function (data) {
        $scope.colleges = data;
      })
        .error(function (data) {
          console.log('Error: ' + data);
        })
    };
    $scope.collegeitemselected = function (item) {
      college = item;
      console.log(item);
    };

    $scope.genderitemselected = function (item) {
      gender = item;
      console.log(item);
    };

    $scope.registerUser = function () {

      if ((city == null) && (college == null) && (gender == null)) {
        $rootScope.toast('Debes elegir una ciudad, una universidad y un género');
      }
      else if (city == null) {
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
          console.log(data);
          $scope.user.username = data.username;
          username = data.username;
          console.log(data);
          $scope.modal.show();
          $rootScope.hideLoading();
        }).error(function (data) {
          $rootScope.hideLoading();
          $rootScope.toast('El usuario ya existe');

        })

      }
    }

    $scope.addMedia = function () {

      navigator.camera.getPicture(uploadPhoto, function (message) {
          $rootScope.toast('Error al obtener la foto');
        }, {
          quality: 50,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
      );

    }

    function uploadPhoto(imageURI) {
      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = "image.jpg";
      options.mimeType = "image/jpg";

      var params = new Object();
      params.value1 = "test";
      params.value2 = "param";

      options.params = params;
      options.chunkedMode = false;

      var ft = new FileTransfer();
      ft.upload(imageURI, _base + "/upload/" + username, win, fail, options);
    }

    function win(r) {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
      $scope.modal.hide();
      $state.go ('login');
    }

    function fail(error) {
      alert(error.code);
    }

    $scope.closeRegister = function () {
      $scope.modal.hide();
      $state.go("login");
    }

  }]).controller('chatCtrl', ['$rootScope', '$state', '$scope', '$cordovaOauth', 'API', '$http', '$ionicModal', function ($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal) {

    var id = window.localStorage['idlogin'];
    $scope.id = id;
    var u = window.localStorage['user'];
    var city = window.localStorage['city'];
    var imageUrl = window.localStorage['imageUrl'];
    var user = {};
    var users = {};
    $scope.message = {};
    $scope.user = {
      _id: id

    };

    $scope.messages = [];
    socket.on('newMessage', function (data) {
      $scope.$apply(function () {
        $scope.messages.push(data);
      });

    })

    //Obtenemos todos los datos de la base de datos
    $http.get('http://147.83.7.156:3000/chat').success(function (data) {
      $scope.messages = data;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.sendMessage = function (sendMessageForm) {
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


  }]).controller('onlineCtrl', ['$rootScope', '$state', '$scope', '$cordovaOauth', 'API', '$http', '$ionicModal', function ($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal) {

    var u = window.localStorage['user'];

    var users = {};


    socket.emit('getUsers', function (data) {

    });
    socket.on('usernames', function (data) {
      console.log(data);
      users = data;
      for (var i = 0; i < users.length; i++) {
        if (users[i].user == u) {
          console.log("encontrado");
          users.splice(i, 1);
          break;
        }
      }
      $scope.$apply(function () {
        $scope.online = users;
      });

    });


  }]).controller('posicionCtrl', function ($scope, $cordovaGeolocation, $ionicLoading) {


    ionic.Platform.ready(function () {
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
        google.maps.event.addListenerOnce($scope.map, 'idle', function () {

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

  }).controller('perfilCtrl', ['$rootScope', '$state', '$scope', '$http', 'API', function ($rootScope, $state, $scope, $http, api) {
    var id = window.localStorage['idlogin'];

    $scope.goBack = function () {
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
    $scope.seeProfile = function () {
      $state.go("profile", {
        id: id
      })
    }

    $scope.editUser = function () {
      $state.go("editar", {
        id: id
      })
    }
    $scope.getPublicaciones = function (username) {
      $state.go("myreleases", {
        user: username
      })
    }

  }]).controller('citiesCtrl', ['$rootScope', '$state', '$scope', 'API', function ($rootScope, $state, $scope, api) {


    api.getCities().success(function (data) {
      $scope.cities = data;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.getMapCity = function (item) {
      api.getCity(item).success(function (data) {
        $state.go("map-city", {
            city: item,
            location: data[0].location
          }
        );
      }).error(function (data) {

      });

    };

  }]).controller('MapCityCtrl', ['$rootScope', '$http', '$state', '$scope', 'API', '$stateParams', function ($rootScope, $http, $state, $scope, api, $stateParams) {

    var location={};
    location=  $stateParams.location;
    var city = $stateParams.city;
    var c1;
    var c2;
    var d = {};
      $scope.mapCreated = function (map) {
        $scope.map = map;

        $scope.map.setCenter(new google.maps.LatLng(location[0], location[1]));

        var myLatLng = {lat: location[0], lng: location[1]};
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map

        });
      }


    $scope.goBack = function () {
      $state.go("menu.cities");
    };


    $scope.getColleges = function () {
      $state.go("colleges", {
          city: city,
        }
      );
    }

    $scope.getCollegesMap = function () {
      api.getColleges(city).success(function (data) {
      $state.go("map-colleges", {
          city: city,
          location: data
        }
      );
      }).error(function (data) {

      });
    }
    //

  }]).controller('MapCollegesCtrl', ['$rootScope', '$http', '$state', '$scope', 'API', '$stateParams', function ($rootScope, $http, $state, $scope, api, $stateParams) {
    var location={};
    location=  $stateParams.location;
    console.log (location);
    var city = $stateParams.city;
    $scope.city = city;

     $scope.mapCreated = function (map) {
        $scope.map = map;

        var infowindowlocal = new google.maps.InfoWindow();
        var markerlocal, i;

        var infowindowLocales=[];


        for (var i = 0; i < location.length; i++) {
          var markerLocales = new google.maps.Marker({
            position: {lat:location[i].location[0], lng: location[i].location[1]},
            map: map,
            myName: location[i].college,
            id:i
          });

          infowindowLocales[i] = new google.maps.InfoWindow({content:location[i].college});

          markerLocales.addListener('click', function() {

            console.log("onclick", this.id, this.myName);
            infowindowLocales[this.id].open(map, markerLocales);
          });
        }
      }


    $scope.goBack = function () {
      $state.go("menu.cities");
    };


  }]).controller('collegesCtrl', ['$rootScope', '$state', '$scope', 'API', '$http', '$stateParams', '$ionicHistory', function ($rootScope, $state, $scope, api, $http, $stateParams, $ionicHistory) {

    var city = $stateParams.city;
    $scope.city = city;
    $scope.goBack = function () {
      $state.go("menu.cities");
    };
    api.getColleges(city).success(function (data) {

      $scope.colleges = data;
    })
      .error(function (data) {
        console.log('Error: ' + data);
      })
    $scope.getStudents = function (item) {
      $state.go("students", {
        city: city,
        college: item

      });

    };

  }]).controller('girlsCtrl', ['$rootScope', '$state', '$scope', 'API', '$http', function ($rootScope, $state, $scope, api, $http) {

  var id = window.localStorage['idlogin'];

    api.getRequestsSend(id).success(function (requests) {

       // $scope.girls = data;
        api.getFriendsUser(id).success(function (friends) {

            api.getGirls().success(function (girls) {

                for (var i=0; i<requests.length; i++){
                  for (var j=0; j<girls.length; j++){
                    if (requests[i].username == girls[j].username){
                      console.log ("encontrado");
                      girls.splice(j, 1);
                      break;
                    }
                  }

                }


                for (var i=0; i<friends.length; i++){
                  console.log ("dentro");
                  for (var j=0; j<girls.length; j++){
                    if (friends[i].username == girls[j].username){
                      console.log ("encontrado");
                      girls.splice(j, 1);
                      break;
                    }
                  }

                }
                $scope.girls = girls;

              })
              .error(function (data) {
                console.log('Error: ' + data);
              })
          })
          .error(function (data) {
            console.log('Error: ' + data);
          })
      })
      .error(function (data) {
        console.log('Error: ' + data);
      })




    $scope.getProfile = function (id) {
      $state.go("perfil-student-girl", {
        id: id
      });

    };

  }]).controller('closeCtrl', ['$rootScope','$state', '$scope', '$location','$ionicHistory', function ($rootScope, $state, $scope, $location,$ionicHistory) {


    window.localStorage.clear();
    socket.close();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $state.go('login', {}, {reload: true});
    setTimeout(function () {
      $window.location.reload(true);
    }, 100);
  }]).controller('releasesCtrl', ['$rootScope', '$state', '$scope', 'API', '$http', '$stateParams', function ($rootScope, $state, $scope, api, $http, $stateParams) {
    var idr = $stateParams.iduser;
    window.localStorage['idr'] = idr;
    var friend = $stateParams.user;
    var id = window.localStorage['idlogin'];
    var u = window.localStorage['user'];
    var user = {};

    api.getReleases(friend).success(function (data) {
      console.log(data);
      $scope.releases = data;


    })
      .error(function (data) {
        console.log('Error: ' + data);
      })

    $scope.sendMessage = function (sendMessageForm) {
      user.user = friend;
      user.ids = id;
      user.text = $scope.text;
      api.addRelease(user).success(function (data) {
        api.getReleases(friend).success(function (data) {
          console.log(data);
          $scope.releases = data;


        })
          .error(function (data) {
            console.log('Error: ' + data);
          })
      })
        .error(function (data) {
          console.log('Error: ' + data);
        })

    };


    $scope.goBack = function () {
      $state.go("perfil-friend", {
        user: u,
        id: idr
      });
    };

    $scope.goComments = function (idr) {
      $state.go("comments", {
        user: u,
        iduser: id,
        friend: friend,
        idr: idr

      });
    };
  }]).controller('myreleasesCtrl', ['$rootScope', '$state', '$scope', 'API', '$http', '$stateParams', function ($rootScope, $state, $scope, api, $http, $stateParams) {
    var idr = $stateParams.iduser;
    window.localStorage['idr'] = idr;
    //var friend = $stateParams.user;
    var id = window.localStorage['idlogin'];
    var u = window.localStorage['user'];
    var user = {};

    api.getReleases(u).success(function (data) {
      console.log(data);
      $scope.releases = data;


    })
      .error(function (data) {
        console.log('Error: ' + data);
      })

    $scope.sendMessage = function (sendMessageForm) {
      user.user = u;
      user.ids = id;
      user.text = $scope.text;
      api.addRelease(user).success(function (data) {
        api.getReleases(u).success(function (data) {
          console.log(data);
          $scope.releases = data;


        })
          .error(function (data) {
            console.log('Error: ' + data);
          })
      })
        .error(function (data) {
          console.log('Error: ' + data);
        })

    };


    $scope.goBack = function () {
      $state.go("profile", {
        user: u,
        id: idr
      });
    };

    $scope.goComments = function (idr) {
      $state.go("mycomments", {
        user: u,
        iduser: id,
        friend: u,
        idr: idr

      });
    };

  }]).controller('commentsCtrl', ['$rootScope', '$state', '$scope', 'API', '$http', '$stateParams', function ($rootScope, $state, $scope, api, $http, $stateParams) {
    var id = $stateParams.iduser;
    var idr = $stateParams.idr;
    var friend = $stateParams.friend;
    var user = {};
    var idlogin = window.localStorage['idlogin'];
    var request = window.localStorage['idr'];
    var user = {};

    api.getComments(idr).success(function (data) {
      console.log(data);
      $scope.comments = data;


    })
      .error(function (data) {
        console.log('Error: ' + data);
      })

    $scope.sendMessage = function (sendMessageForm) {
      user.iduser = id;
      user.idr = idr;
      user.text = $scope.text;
      api.addComment(user).success(function (data) {
        api.getComments(idr).success(function (data) {
          console.log(data);
          $scope.comments = data;


        })
          .error(function (data) {
            console.log('Error: ' + data);
          })
      })
        .error(function (data) {
          console.log('Error: ' + data);
        })

    };


    $scope.goBack = function () {
      $state.go("releases", {
        user: friend,
        iduser: request
      });
    };


  }]).controller('boysCtrl', ['$rootScope', '$state', '$scope', 'API', '$http', function ($rootScope, $state, $scope, api, $http) {
  var id = window.localStorage['idlogin'];
  api.getRequestsSend(id).success(function (requests) {

      // $scope.girls = data;
      api.getFriendsUser(id).success(function (friends) {

          api.getBoys().success(function (boys) {

              for (var i=0; i<requests.length; i++){
                for (var j=0; j<boys.length; j++){
                  if (requests[i].username == boys[j].username){
                    console.log ("encontrado");
                    boys.splice(j, 1);
                    break;
                  }
                }

              }


              for (var i=0; i<friends.length; i++){
                console.log ("dentro");
                for (var j=0; j<boys.length; j++){
                  if (friends[i].username == boys[j].username){
                    console.log ("encontrado");
                    boys.splice(j, 1);
                    break;
                  }
                }

              }
              $scope.boys = boys;

            })
            .error(function (data) {
              console.log('Error: ' + data);
            })
        })
        .error(function (data) {
          console.log('Error: ' + data);
        })
    })
    .error(function (data) {
      console.log('Error: ' + data);
    })
    $scope.getProfile = function (id) {
      $state.go("perfil-student-boy", {
        id: id
      });

    };
    $scope.goBack = function () {
      $state.go("profile-request", {
        city: city,
        college: college
      })
    };

  }]).controller('mycommentsCtrl', ['$rootScope', '$state', '$scope', 'API', '$http', '$stateParams', function ($rootScope, $state, $scope, api, $http, $stateParams) {
    var id = $stateParams.iduser;
    var idr = $stateParams.idr;
    var friend = $stateParams.friend;
    var user = {};
    var idlogin = window.localStorage['idlogin'];
    var request = window.localStorage['idr'];
    var user = {};

    api.getComments(idr).success(function (data) {
      console.log(data);
      $scope.comments = data;


    })
      .error(function (data) {
        console.log('Error: ' + data);
      })

    $scope.sendMessage = function (sendMessageForm) {
      user.iduser = id;
      user.idr = idr;
      user.text = $scope.text;
      api.addComment(user).success(function (data) {
        api.getComments(idr).success(function (data) {
          console.log(data);
          $scope.comments = data;


        })
          .error(function (data) {
            console.log('Error: ' + data);
          })
      })
        .error(function (data) {
          console.log('Error: ' + data);
        })

    };


    $scope.goBack = function () {
      $state.go("myreleases", {
        user: friend,
        iduser: request
      });
    };



  }]).controller('perfil-studentCtrl', ['$rootScope', '$state', '$scope', '$http', 'API', '$stateParams','$ionicPopup', function ($rootScope, $state, $scope, $http, api, $stateParams,$ionicPopup) {
    var iduser = $stateParams.id;
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

    $scope.goBack = function () {
      $state.go("students", {
        city: city,
        college: college
      })
    };
    $scope.goBackGirls = function () {
      $state.go("menu.girls")
    };
    $scope.goBackBoys = function () {
      $state.go("menu.boys")
    };
    var user = {};
    $scope.addRequest = function (username) {
      var id = window.localStorage['idlogin'];
      var u = window.localStorage['user'];
      if (u!=username) {
        user._id = id;
        user.username = username;
        $rootScope.showLoading("Enviando Solicitud..");
        api.addrequest(user).success(function (data) {
          $rootScope.toast('Solicitud Enviada');
          $state.go("menu.posicion")
        }).error(function (data) {

        })
      }
      else{
          var alertPopup = $ionicPopup.alert({
            title: 'Opps!',
            template: 'No puedes ser amigo de ti mismo!'
          });


      }
    };

    $scope.editMessage = function (username) {
      $state.go("edit-message", {
        id: iduser,
        city: city,
        college:college,
        user: username
      })
    };
    $scope.editMessageGirl = function (username) {
      $state.go("edit-message-girl", {
        user: username
      })
    };
    $scope.editMessageBoy = function (username) {
      $state.go("edit-message-boy", {
        user: username
      })
    };


  }]).controller('perfil-requestCtrl', ['$rootScope', '$state', '$scope', '$http', 'API', '$stateParams', function ($rootScope, $state, $scope, $http, api, $stateParams) {
    var iduser = $stateParams.id; //id de paula

    api.getUser(iduser).success(function (data) {

      console.log(data._id);
      console.log(data.username);

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
    var user = {};
    $scope.addFriend = function (username) {
      var u = window.localStorage['user'];
      user.user = u;
      user._id = iduser;
      $rootScope.showLoading("Confirmado solicitud..");
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
        $rootScope.toast('Solicitud confirmada');
        $state.go("menu.posicion");
      }).error(function (data) {

      })
    }
    $scope.deleteRequest = function () {
      var idrequest = window.localStorage['idrequest'];
      $rootScope.showLoading("Eliminado Solicitud..");
      api.deleterequest(idrequest).success(function (data) {
        $rootScope.hideLoading();
        $rootScope.toast('Solicitud Eliminada!');
        $state.go("menu.posicion");
      }).error(function (data) {

      })
    };
    $scope.getPublicaciones = function (user) {
      $state.go("releases", {
        iduser: iduser,
        user: user
      })
    }
    $scope.goBack = function() {
      $state.go("menu.friends");
    };

  }]).controller('requestsCtrl', ['$rootScope', '$state', '$scope', 'API', '$stateParams', function ($rootScope, $state, $scope, api, $stateParams) {

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
    function ($filter) {
      return function (data) {
        if (!data) return data;
        return data.replace(/\n\r?/g, '<br />');
      };
    }
  ]).controller('messageCtrl', ['$rootScope', '$state', '$scope', 'API', '$stateParams', function ($rootScope, $state, $scope, api, $stateParams) {

    var user = $stateParams.user;
    var iduser = $stateParams.iduser;
    var college = $stateParams.college;
    var city = $stateParams.city;
    var id = window.localStorage['idlogin'];
    var u = window.localStorage['user'];
    console.log(user);
    $scope.user = user;
    var message = {};
    $scope.sendMessage = function (subject, text) {
      message.receiver = user;
      message.ids = id;
      message.subject = subject,
        message.text = text;
      $rootScope.showLoading("Enviando Mensaje..");
      api.sendMessage(message).success(function (data) {
        $rootScope.toast('Mensage enviado');
        $state.go("menu.cities")
      })
        .error(function (data) {
          console.log('Error: ' + data);
        });

    };
    $scope.goBack = function () {
      $state.go("students", {
        city: city,
        college: college,
        id: iduser,
      });
    };
    $scope.goBackGirl = function () {
      $state.go("menu.girls");
    };
    $scope.goBackBoy = function () {
      $state.go("menu.boys");
    };
    api.findmessages(u).success(function (data) {
      $scope.mensajes = data;
    })
      .error(function (data) {
        console.log('Error: ' + data);
      });

  }]).controller('friendsCtrl', ['$rootScope', '$state', '$scope', 'API', '$stateParams', function ($rootScope, $state, $scope, api, $stateParams) {

    var user = window.localStorage['user'];
    api.getfriends(user).success(function (data) {
      $scope.users = data;


    })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.getFriend = function (u, id) {
      console.log(u);
      $state.go("perfil-friend", {
        user: u,
        id: id
      })
    }


  }]).controller('studentsCtrl', ['$rootScope', '$state', '$scope', 'API', '$stateParams', function ($rootScope, $state, $scope, api, $stateParams) {

    var college = $stateParams.college;
    var city = $stateParams.city;
    $scope.college = college;

    $scope.goBack = function () {
      $state.go("colleges", {
        city: city
      })
    };
  var id = window.localStorage['idlogin'];
  api.getRequestsSend(id).success(function (requests) {

      // $scope.girls = data;
      api.getFriendsUser(id).success(function (friends) {

          api.getStudents(college).success(function (students) {

              for (var i=0; i<requests.length; i++){
                for (var j=0; j<students.length; j++){
                  if (requests[i].username == students[j].username){
                    console.log ("encontrado");
                    students.splice(j, 1);
                    break;
                  }
                }

              }


              for (var i=0; i<friends.length; i++){
                console.log ("dentro");
                for (var j=0; j<students.length; j++){
                  if (friends[i].username == students[j].username){
                    console.log ("encontrado");
                    students.splice(j, 1);
                    break;
                  }
                }

              }
              $scope.users = students;

            })
            .error(function (data) {
              console.log('Error: ' + data);
            })
        })
        .error(function (data) {
          console.log('Error: ' + data);
        })
    })
    .error(function (data) {
      console.log('Error: ' + data);
    })


    $scope.getStudent = function (id) {
      $state.go("perfil-student", {
        city: city,
        college: college,
        id: id
      })
    }


  }]).controller('editarCtrl', ['$rootScope', '$state', '$scope', '$http', 'API', '$ionicModal', '$stateParams', function ($rootScope, $state, $scope, $http, api, $ionicModal, $stateParams) {
    var idput;
    $scope.user = {};
    $scope.selected = false;
    var id = $stateParams.id;
    var u = $stateParams.user;
    $scope.goBack = function () {
      $state.go("profile");
    };

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
// Funci�n que obtiene un objeto usuario conocido su id
    $http.get(_base + '/user/' + id)
      .success(function (data) {
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
        console.log(data);
      })
      .error(function (data) {
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
      phone: ''
    }

    var username;
    $scope.genders = [
      {gender: "Hombre"},
      {gender: "Mujer"},
    ];

    $http.get(_base + '/cities').success(function (data) {
      $scope.cities = data;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });
    $scope.cityitemselected = function (item) {
      city = item;
      console.log(city);
      $http.get(_base + '/colleges/' + item)
        .success(function (data) {
          $scope.colleges = data;
        })
        .error(function (data) {
          console.log('Error: ' + data);
        })
    };
    $scope.collegeitemselected = function (item) {
      college = item;
      console.log(item);
    };
    $scope.genderitemselected = function (item) {
      gender = item;
      console.log(item);
    };

    $scope.editUser = function () {
      if ((city == null) && (college == null) && (gender == null)) {
        $rootScope.toast('Debes elegir una ciudad, una universidad y un género');
      }
      else if (city == null) {
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
          console.log(data);
          $scope.user.username = data.username;
          username = data.username;
          console.log(data);
          $scope.modal.show();
          $rootScope.hideLoading();
        }).error(function (data) {
          $rootScope.hideLoading();

        })

      }
    }

    $scope.addMedia = function () {

      navigator.camera.getPicture(uploadPhoto, function (message) {
          $rootScope.toast('Error al cargar la foto');
        }, {
          quality: 50,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
      );

    }

    function uploadPhoto(imageURI) {
      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = "image.jpg";
      options.mimeType = "image/jpg";

      var params = new Object();
      params.value1 = "test";
      params.value2 = "param";

      options.params = params;
      options.chunkedMode = false;

      var ft = new FileTransfer();
      ft.upload(imageURI, _base + "/upload/" + username, win, fail, options);
    }

    function win(r) {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
      $scope.modal.hide();
      $state.go ('profile',{
        id: id});
    }

    function fail(error) {
      alert(error.code);
    }

    $scope.closeRegister = function () {
      $scope.modal.hide();
      $state.go ('profile',{
        id: id});
    }


  }]);


