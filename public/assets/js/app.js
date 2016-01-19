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
            resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'perfect_scrollbar', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl','profileCtrl'),
            abstract: true,

        }).state('app', {
            url: "/app",
            templateUrl: "assets/views/app.html",
            resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'perfect_scrollbar', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl', 'positionCtrl','profileCtrl'),
            abstract: true,
            controller: 'positionCtrl',
        }).state('admin.home', {
            url: "/home/:user/:id",
            templateUrl: "assets/views/ausers.html",
            title: "Usuarios",
            resolve: loadSequence('usersCtrl'),
            controller: 'usersCtrl',
            ncyBreadcrumb: {
                label: 'Usuarios'
            }
        }).state('admin.cities', {
                url: "/cities/:user/:id",
                templateUrl: "assets/views/acities.html",
                title: "Ciudades",
                resolve: loadSequence('cityCtrl'),
                controller: 'cityCtrl',
                ncyBreadcrumb: {
                    label: 'Ciudades'
                }
        }).state('admin.colleges', {
                url: "/colleges/:user/:id/:city",
                templateUrl: "assets/views/acolleges.html",
                title: "Universidades",
                resolve: loadSequence('collegesCtrl'),
                controller: 'collegesCtrl',
                ncyBreadcrumb: {
                    label: 'Ciudades'
                }
        }).state('admin.profile', {
            url: "/profile/:user/:id",
            templateUrl: "assets/views/profile-admin.html",
            title: "Profile",
            resolve: loadSequence('profileCtrl'),
            controller: 'profileCtrl',
            ncyBreadcrumb: {
                label: 'Profile'
            }
        }).state('admin.update', {
            url: "/update/:user/:id",
            templateUrl: "assets/views/update.html",
            title: "Update",
            resolve: loadSequence('updateCtrl'),
            controller: 'updateCtrl',
            ncyBreadcrumb: {
                label: 'Update'
            }
        }).state('admin.profile-student', {
                url: "/profile-student/:user/:id",
                templateUrl: "assets/views/profile-student.html",
                title: "Profile-Student",
                resolve: loadSequence('profileStudentCtrl'),
                controller: 'profileStudentCtrl',
                ncyBreadcrumb: {
                    label: 'Profile-Student'
                }
        }).state('admin.messages', {
                url: '/messages/:user/:id',
                templateUrl: "assets/views/messages.html",
                resolve: loadSequence('truncate', 'htmlToPlaintext', 'inboxCtrl')
        }).state('app.home', {
            url: "/home/:user/:id",
            templateUrl: "assets/views/home.html",
            resolve: loadSequence('positionCtrl'),
            title: 'Mi posicion',
            ncyBreadcrumb: {
                label: 'Mi posicion'
            }

        }).state('app.enter', {
                url: "/enter",
                templateUrl: "assets/views/home.html",
                resolve: loadSequence('positionCtrl'),
                title: 'Mi posicion',
                ncyBreadcrumb: {
                    label: 'Mi posicion'
                }

        }).state('app.ciudades', {
            url: "/ciudades/:user/:id",
            templateUrl: "assets/views/ciudades.html",
            title: "Ciudades",
            resolve: loadSequence('cityCtrl'),
            controller: 'cityCtrl',
            ncyBreadcrumb: {
                label: 'Ciudades'
            }
        }).state('app.update', {
            url: "/update/:user/:id",
            templateUrl: "assets/views/update.html",
            resolve: loadSequence('updateCtrl'),
            title: "Update",
            controller: 'updateCtrl',
            ncyBreadcrumb: {
                label: 'Update'
            }
        }).state('app.profile', {
            url: "/profile/:user/:id",
            templateUrl: "assets/views/profile-register.html",
            title: "Profile",
            resolve: loadSequence('profileCtrl'),
            controller: 'profileCtrl',
            ncyBreadcrumb: {
                label: 'Profile'
            }

        }).state('app.profile-student', {
                url: "/profile-student/:user/:id",
                templateUrl: "assets/views/profile-student.html",
                title: "Profile-Student",
                resolve: loadSequence('profileStudentCtrl'),
                controller: 'profileStudentCtrl',
                ncyBreadcrumb: {
                    label: 'Profile-Student'
                }
        }).state('app.profile-friend', {
                url: "/profile-friend/:user/:id",
                templateUrl: "assets/views/profile-friend.html",
                title: "Profile-Student",
                resolve: loadSequence('profileStudentCtrl'),
                controller: 'profileStudentCtrl',
                ncyBreadcrumb: {
                    label: 'Profile-Student'
                }
        }).state('app.students', {
            url: "/students/:user/:id/:college",
            templateUrl: "assets/views/students.html",
            resolve: loadSequence('studentsCtrl'),
            title: "Students",
            controller: 'studentsCtrl',
            ncyBreadcrumb: {
                label: 'Students'
            }
        }).state('app.releases', {
                url: "/releases/:user/:id/:friend",
                templateUrl: "assets/views/releases.html",
                resolve: loadSequence('releaseCtrl'),
                title: "Publicaciones",
                controller: 'releaseCtrl',
                ncyBreadcrumb: {
                    label: 'Publicaciones'
                }
        }).state('app.comments', {
                url: "/comments/:user/:id/:friend/:idr",
                templateUrl: "assets/views/comments.html",
                resolve: loadSequence('commentCtrl'),
                title: "Comentarios",
                controller: 'commentCtrl',
                ncyBreadcrumb: {
                    label: 'Comentarios'
                }
        }).state('app.requests', {
            url: "/requests/:user/:id",
            templateUrl: "assets/views/requests.html",
            resolve: loadSequence('requestsCtrl'),
            title: "Solicitudes",
            controller: 'requestsCtrl',
            ncyBreadcrumb: {
                label: 'Solicitudes'
            }
        }).state('app.friends', {
                url: "/friends/:user/:id",
                templateUrl: "assets/views/friends.html",
                resolve: loadSequence('friendsCtrl'),
                title: "Friends",
                controller: 'friendsCtrl',
                ncyBreadcrumb: {
                    label: 'Friends'
                }
        }).state('app.messages', {
                url: '/messages/:user/:id',
                templateUrl: "assets/views/messages.html",
                resolve: loadSequence('truncate', 'htmlToPlaintext', 'inboxCtrl')
        }).state('app.boys', {
                url: '/boys/:user/:id',
                templateUrl: "assets/views/boys.html",
                resolve: loadSequence('boyCtrl'),
                title: "Boys",
                controller: 'boyCtrl',
                ncyBreadcrumb: {
                    label: 'Boys'
                }
        }).state('app.girls', {
                url: '/girls/:user/:id',
                templateUrl: "assets/views/girls.html",
                resolve: loadSequence('girlCtrl'),
                title: "Girls",
                controller: 'girlCtrl',
                ncyBreadcrumb: {
                    label: 'Girls'
                }
        }).state('app.chat', {
                url: '/chat/:user/:id',
                templateUrl: "assets/views/chat.html",
                resolve: loadSequence('chatCtrl'),
                title: "Chat",
                controller: 'chatCtrl',
                ncyBreadcrumb: {
                    label: 'Chat'
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
        }).state('login.registration', {
            url: '/registration',
            templateUrl: "assets/views/login_registration.html",
            resolve: loadSequence('loginCtrl'),
            controller: 'loginCtrl'
        });


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