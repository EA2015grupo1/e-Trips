/**
 * Created by Javi on 11/11/2015.
 */
'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;

        // LAZY MODULES

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules
        });

        // APPLICATION ROUTES
        // -----------------------------------
        // For any unmatched url, redirect to /app/dashboard
        $urlRouterProvider.otherwise("/login/signin");
        //
        // Set up the states
        $stateProvider.state('app', {
            url: "/app",
            templateUrl: "assets/views/app.html",
            resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'perfect_scrollbar', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl'),
            abstract: true,
            controller: 'MapCtrl'
        }).state('app.home', {
            url: "/home",
            templateUrl: "assets/views/home.html",
            resolve: loadSequence('jquery-sparkline', 'sparkline', 'dashboardCtrl'),
            title: 'Mi posicion',
            ncyBreadcrumb: {
                label: 'Mi posicion'
            }

        }).state('app.usuarios', {
            url: "/usuarios",
            templateUrl: "assets/views/ausers.html",
            title: "Usuarios",
            controller: 'usersCtrl',
            ncyBreadcrumb: {
                label: 'Usuarios'
            }
        }).state('app.ciudades', {
            url: "/ciudades",
            templateUrl: "assets/views/ciudades.html",
            title: "Ciudades",
            controller: 'usersCtrl',
            ncyBreadcrumb: {
                label: 'Usuarios'
            }
        }).state('app.update', {
            url: "/update",
            templateUrl: "assets/views/update.html",
            title: "Update",
            controller: 'updateCtrl',
            ncyBreadcrumb: {
                label: 'Update'
            }
        }).state('app.profile', {
            url: "/profile",
            templateUrl: "assets/views/profile.html",
            title: "Profile",
            controller: 'updateCtrl',
            ncyBreadcrumb: {
                label: 'Profile'
            }
        }).state('app.documentation', {
            url: "/documentation",
            templateUrl: "assets/views/documentation.html",
            title: "Documentation",
            ncyBreadcrumb: {
                label: 'Documentation'
            }
        }).state('error', {
            url: '/error',
            template: '<div ui-view class="fade-in-up"></div>'
        }).state('error.404', {
            url: '/404',
            templateUrl: "assets/views/utility_404.html",
        }).state('error.500', {
            url: '/500',
            templateUrl: "assets/views/utility_500.html",
        })

            // Login routes

            .state('login', {
                url: '/login',
                template: '<div ui-view class="fade-in-right-big smooth"></div>',
                abstract: true
            }).state('login.signin', {
                url: '/signin',
                templateUrl: "assets/views/login_login.html",
                controller: 'loginCtrl'
            }).state('login.forgot', {
                url: '/forgot',
                templateUrl: "assets/views/login_forgot.html"
            }).state('login.registration', {
                url: '/registration',
                templateUrl: "assets/views/login_registration.html",
                controller: 'loginCtrl'
            }).state('login.lockscreen', {
                url: '/lock',
                templateUrl: "assets/views/login_lock_screen.html"
            });
        app.controller('loginCtrl',['$scope', '$location', '$cookies', '$cookieStore','$http', function($scope, $location, $cookies, $cookieStore,$http) {
            $scope.newUser = {};
            $scope.user = {};
            $scope.selected = false;
            $scope.uploadFile = function() {
                var file = $scope.file;
                console.log (file);
            }
            // Funcion para logear un usuario
            $scope.loginUser = function (newUser) {
                if ((!newUser.username) && (!newUser.password)){
                    $scope.user.u = "Usuario es requerido";
                    $scope.user.p = "Password es requerido";
                }
                else if (!newUser.username){
                    $scope.user.u = "Usuario es requerido";
                    $scope.user.p = "";
                }
                else if (!newUser.password){
                    $scope.user.u = "";
                    $scope.user.p = "Password es requerido";
                }
                else {

                    $http.post('/api/users/login', newUser)
                        .success(function (data) {
                            console.log(data);
                            console.log(data.user[0].imageUrl);
                            $cookieStore.put('rol', data.user[0].rol);
                            $cookieStore.put('idlogin', data.user[0]._id);
                            $location.path('/app/home');

                        })
                        .error(function (data) {
                            swal("Opps!", "Usuario o password incorrecto!", "error")
                            console.log(data);

                        })
                }


            };
            // Funcion para registrar a un usuario
            $scope.registerUser = function(newUser) {
                if ((!newUser.name) && (!newUser.username) && (!newUser.email) && (!newUser.password)&& (!newUser.city)&& (!newUser.college)&&(!newUser.gender)) {
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.name) {

                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }

                else if (!newUser.username) {

                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.email) {

                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.password) {

                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.city) {

                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.college) {

                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.gender) {

                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!$scope.file) {

                    swal("Opps!", "Debes elegir una imagen de perfil!", "error")
                }
                else{
                swal({
                        title: "¿Estas seguro de registrar?",
                        text: "Una vez registrado se volvera a la pagina de inicio!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#6cdd55",
                        confirmButtonText: "Si, registralo!",
                        closeOnConfirm: true
                    },
                    function () {
                        var formData = new FormData();
                        var username = newUser.username;
                        var file = $scope.file;
                        formData.append("file", file);
                        $http.post('/api/users', newUser)
                            .success(function (data) {

                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });

                        $http.put('/api/users/upload/' + username, formData, {
                                headers: {
                                    "Content-type": undefined
                                },
                                transformRequest: angular.identity
                            }
                        )
                            .success(function (data) {

                                $location.path('/app/signin');
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });

                    });
            }


            };


        }]);
        app.factory("Users", function ($resource) {
            return $resource('/api/users'); //la url donde queremos consumir
        });
        app.controller('usersCtrl',['$scope', '$location', '$cookies', '$cookieStore', '$http', 'ngTableParams','Users',  function($scope, $location,$cookies, $cookieStore, $http, ngTableParams, Users) {
            $scope.newUser = {};
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
                count: 3
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
                                    location.href = '#/app/usuarios';
                                    location.reload('#/app/usuarios');
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

        app.controller('updateCtrl',['$scope', '$location', '$cookies', '$cookieStore', '$http', function($scope, $location,$cookies, $cookieStore, $http) {
            $scope.newUser = {};
            $scope.user = {};
            $scope.selected = false;
            var id = $cookieStore.get('id');


        // Funcion que obtiene un objeto usuario conocido su id
            $http.get('/api/users/' + id)
                .success(function(data) {
                    $scope.user._id = data._id;
                    $scope.user.username = data.username;
                    $scope.user.name = data.name;
                    $scope.user.email = data.email;
                    $scope.user.password = data.password;
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
            // Funcion para editar los datos de un usuario
            $scope.updateUser = function(newUser, po, pr) {
                newUser.rol= $scope.user.rol;
                newUser.imageUrl= $scope.user.imageUrl;
                console.log (newUser);
                console.log (newUser.po);
                console.log (newUser.pr);
                if ((!newUser.name) && (!newUser.username) && (!newUser.email) && (!newUser.po)&&(!newUser.pr)&& (!newUser.city)&& (!newUser.college)&&(!newUser.gender)){
                    $scope.user.n = "Nombre Completo es requerido";
                    $scope.user.e = "Correo Electronico es requerido";
                    $scope.user.u = "Usuario es requerido";
                    $scope.user.p = "Password es requerido";
                    $scope.user.ci = "El nombre de la ciudad es requerido";
                    $scope.user.uni = "El nobmre de tu universidad es requerido";
                    $scope.user.g = "Genero es requerido";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.name){
                    $scope.user.n = "Nombre Completo es requerido";
                    $scope.user.u = "";
                    $scope.user.e = "";
                    $scope.user.p = "";
                    $scope.user.ci = "";
                    $scope.user.uni = "";
                    $scope.user.g = "";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }

                else if (!newUser.username){
                    $scope.user.n = "";
                    $scope.user.u = "Usuario es requerido";
                    $scope.user.e = "";
                    $scope.user.p = "";
                    $scope.user.ci = "";
                    $scope.user.uni = "";
                    $scope.user.g = "";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.email){
                    $scope.user.n = "";
                    $scope.user.u = "";
                    $scope.user.e = "Correo Electronico es requerido";
                    $scope.user.p = "";
                    $scope.user.ci = "";
                    $scope.user.uni = "";
                    $scope.user.g = "";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.po){
                    $scope.user.n = "";
                    $scope.user.u = "";
                    $scope.user.e = "";
                    $scope.user.ci = "";
                    $scope.user.uni = "";
                    $scope.user.g = "";
                    $scope.user.p = "Password es requerido";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.po){
                    $scope.user.n = "";
                    $scope.user.u = "";
                    $scope.user.e = "";
                    $scope.user.ci = "";
                    $scope.user.uni = "";
                    $scope.user.g = "";
                    $scope.user.p = "Password es requerido";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.city){
                    $scope.user.n = "";
                    $scope.user.u = "";
                    $scope.user.e = "";
                    $scope.user.ci = "El nombre de la ciudad es requerido";
                    $scope.user.uni = "";
                    $scope.user.g = "";
                    $scope.user.p = "";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.college){
                    $scope.user.n = "";
                    $scope.user.u = "";
                    $scope.user.e = "";
                    $scope.user.ci = "";
                    $scope.user.uni = "El nobmre de tu universidad es requerido";
                    $scope.user.g = "";
                    $scope.user.p = "";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.gender){
                    $scope.user.n = "";
                    $scope.user.u = "";
                    $scope.user.e = "";
                    $scope.user.ci = "";
                    $scope.user.uni = "";
                    $scope.user.g = "Genero es requerido";
                    $scope.user.p = "";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (newUser.po!=newUser.pr){

                    swal("Opps!", "Los passwords no son iguales!", "error")
                }
                else if (!$scope.file){

                    swal("Opps!", "Debes elegir una imagen de perfil!", "error")
                }


                else {
                    newUser.password=newUser.po;
                    newUser.pr="";
                    swal({
                            title: "¿Estas seguro de editar tu cuenta?",
                            text: "Una vez editada tu cuenta se volvera a tu perfil!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#6cdd55",
                            confirmButtonText: "Si, registralo!",
                            closeOnConfirm: true
                        },
                        function () {
                            var formData = new FormData();
                            var username = newUser.username;
                            var file = $scope.file;
                            formData.append("file", file);
                            $http.put('/api/users/' + $scope.user._id, newUser)
                                .success(function (data) {
                                    $scope.users = data;
                                    console.log(data);
                                    location.href = '#/app/home';
                                    location.reload('#/app/home');
                                })
                                .error(function (data) {
                                    console.log('Error: ' + data);
                                });
                            $http.put('/api/users/upload/' + username, formData, {
                                    headers: {
                                        "Content-type": undefined
                                    },
                                    transformRequest: angular.identity
                                }
                            )
                                .success(function (data) {

                                    location.href = '#/app/profile';
                                    location.reload('#/app/profile');
                                })
                                .error(function (data) {
                                    console.log('Error: ' + data);
                                });
                        });
                }
            };

        }]);
        app.controller('profileCtrl',['$scope', '$sce', '$location', '$cookies', '$cookieStore', '$http', function($scope,$sce, $location,$cookies, $cookieStore, $http) {
            $scope.newUser = {};
            $scope.user = {};
            $scope.selected = false;
            var id = $cookieStore.get('idlogin');
            var rol = $cookieStore.get('rol');

            if (rol=="administrador"){

               // $scope.customHtml = "input type='button' class='btn btn-wide btn-dark-blue";
            }
            $scope.getProfile = function(id) {
                console.log (id);
                $cookieStore.put('id', id);
                location.href = '#/app/profile';
                location.reload('#/app/profile');

            };

            if (id==undefined) {

                $http.get('/api/users/provider/twitter')
                    .success(function (data) {
                        $scope.user._id = data._id;
                        $scope.user.username = data.username;
                        $scope.user.name = data.name;
                        $scope.user.email = data.email;
                        $scope.user.phone = data.phone;
                        $scope.user.gender = data.gender;
                        $scope.user.college= data.college;
                        $scope.user.city = data.city;
                        $scope.user.rol = data.rol;
                        $scope.user.imageUrl = data.imageUrl;
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
                $http.get('/api/users/provider/facebook')
                    .success(function (data) {
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
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
            else{
                // Funcion que obtiene un objeto usuario conocido su id
                $http.get('/api/users/' + id)
                    .success(function (data) {
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
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }

            $scope.salirUser = function() {
                console.log ("hola vamonos");
                $cookieStore.remove('idlogin');
                $cookieStore.remove('id');
                $cookieStore.remove('rol');
                $location.path ('/login/signin');
            }
        }]);

        app.directive('uploaderModel', ["$parse", function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, iElement, iAttrs)
                {
                    iElement.on("change", function(e)
                    {
                        $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
                    });
                }
            };
        }])
        app.factory('MarkerCreatorService', function () {

            var markerId = 0;

            function create(latitude, longitude) {
                var marker = {
                    options: {
                        animation: 1,
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
                geocoder.geocode({'address' : address}, function (results, status) {
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

        app.controller('MapCtrl', ['MarkerCreatorService', '$scope',  function (MarkerCreatorService, $scope) {

            MarkerCreatorService.createByCoords(40.454018, -3.509205, function (marker) {
                $scope.autentiaMarker = marker;
            });

            $scope.address = '';

            $scope.map = {
                center: {
                    latitude: $scope.autentiaMarker.latitude,
                    longitude: $scope.autentiaMarker.longitude
                },
                zoom: 12,
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
                $scope.map.control.refresh({latitude: marker.latitude,
                    longitude: marker.longitude});
            }

        }]);
        // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
        function loadSequence() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q',
                    function ($ocLL, $q) {
                        var promise = $q.when(1);
                        for (var i = 0, len = _args.length; i < len; i++) {
                            promise = promiseThen(_args[i]);
                        }
                        return promise;

                        function promiseThen(_arg) {
                            if (typeof _arg == 'function')
                                return promise.then(_arg);
                            else
                                return promise.then(function () {
                                    var nowLoad = requiredData(_arg);
                                    if (!nowLoad)
                                        return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                    return $ocLL.load(nowLoad);
                                });
                        }

                        function requiredData(name) {
                            if (jsRequires.modules)
                                for (var m in jsRequires.modules)
                                    if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                                        return jsRequires.modules[m];
                            return jsRequires.scripts && jsRequires.scripts[name];
                        }
                    }]
            };
        }
    }]);