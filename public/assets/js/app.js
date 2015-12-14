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
        $stateProvider.state('admin', {
            url: "/admin",
            templateUrl: "assets/views/admin.html",
            resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'perfect_scrollbar', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl'),
            abstract: true,

        }).state('app', {
            url: "/app",
            templateUrl: "assets/views/app.html",
            resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'perfect_scrollbar', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl', 'positionCtrl'),
            abstract: true,
            controller: 'positionCtrl',
        }).state('admin.home', {
            url: "/home",
            templateUrl: "assets/views/ausers.html",
            title: "Usuarios",
            resolve: loadSequence('usersCtrl'),
            controller: 'usersCtrl',
            ncyBreadcrumb: {
                label: 'Usuarios'
            }
        }).state('admin.update', {
            url: "/update",
            templateUrl: "assets/views/update.html",
            title: "Update",
            resolve: loadSequence('updateCtrl'),
            controller: 'updateCtrl',
            ncyBreadcrumb: {
                label: 'Update'
            }
        }).state('admin.profile', {
            url: "/profile",
            templateUrl: "assets/views/profile.html",
            title: "Profile",
            resolve: loadSequence('updateCtrl'),
            controller: 'updateCtrl',
            ncyBreadcrumb: {
                label: 'Profile'
            }
        }).state('app.home', {
            url: "/home",
            templateUrl: "assets/views/home.html",
            resolve: loadSequence('positionCtrl'),
            title: 'Mi posicion',
            ncyBreadcrumb: {
                label: 'Mi posicion'
            }

        }).state('app.ciudades', {
            url: "/ciudades",
            templateUrl: "assets/views/ciudades.html",
            title: "Ciudades",
            resolve: loadSequence('cityCtrl'),
            controller: 'cityCtrl',
            ncyBreadcrumb: {
                label: 'Ciudades'
            }
        }).state('app.update', {
            url: "/update",
            templateUrl: "assets/views/update.html",
            resolve: loadSequence('updateCtrl'),
            title: "Update",
            controller: 'updateCtrl',
            ncyBreadcrumb: {
                label: 'Update'
            }
        }).state('app.profile', {
            url: "/profile",
            templateUrl: "assets/views/profile.html",
            title: "Profile",
            resolve: loadSequence('profileCtrl'),
            controller: 'profileCtrl',
            ncyBreadcrumb: {
                label: 'Profile'
            }
        }).state('app.profile-student', {
            url: "/profile-student",
            templateUrl: "assets/views/profile-student.html",
            title: "Profile-Student",
            resolve: loadSequence('profile-studentCtrl'),
            controller: 'profile-studentCtrl',
            ncyBreadcrumb: {
                label: 'Profile-Student'
            }
        }).state('app.students', {
            url: "/students/:college",
            templateUrl: "assets/views/students.html",
            resolve: loadSequence('studentsCtrl'),
            title: "Students",
            controller: 'studentsCtrl',
            ncyBreadcrumb: {
                    label: 'Students'
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
            resolve: loadSequence('loginCtrl'),
            controller: 'loginCtrl'
        }).state('login.forgot', {
            url: '/forgot',
            templateUrl: "assets/views/login_forgot.html"
        }).state('login.registration', {
            url: '/registration',
            templateUrl: "assets/views/login_registration.html",
            resolve: loadSequence('loginCtrl'),
            controller: 'loginCtrl'
        }).state('login.lockscreen', {
            url: '/lock',
            templateUrl: "assets/views/login_lock_screen.html"
        }).state('application', {
            url: '/application',
            template: '<div ui-view class="fade-in-right-big smooth"></div>',
            abstract: true
        }).state('application.chat', {
            url: '/chat',
            templateUrl: "assets/views/chat.html",
            controller: 'ChatCtrl',
            title: "Chat",
            ncyBreadcrumb: {
                label: 'Chat'
            }
        });


        app.controller('profileCtrl', ['$scope', '$sce', '$location', '$cookies', '$cookieStore', '$http', function ($scope, $sce, $location, $cookies, $cookieStore, $http) {
            $scope.newUser = {};
            $scope.user = {};
            $scope.selected = false;
            var id = $cookieStore.get('idlogin');

            $scope.getProfile = function (id) {
                console.log (id);
                $cookieStore.put('id', id);
                $location.path ('/app/profile');

            };

            if (id == undefined) {

                $http.get('/api/users/provider/twitter')
                    .success(function (data) {
                        if (data != null) {
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
                        }
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
                $http.get('/api/users/provider/facebook')
                    .success(function (data) {
                        if (data != null) {
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
                        }
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
            else {
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

            $scope.salirUser = function () {
                $cookieStore.remove('idlogin');
                $cookieStore.remove('conectado');
                $cookieStore.remove('college');
                $location.path ('/login/signin');
            };
        }]);


        app.directive('uploaderModel', ["$parse", function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, iElement, iAttrs) {
                    iElement.on("change", function (e) {
                        $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
                    });
                }
            };
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