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
            title: 'Dashboard',
            ncyBreadcrumb: {
                label: 'Dashboard'
            }
        }).state('app.ui', {
            url: '/ui',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'UI Elements',
            ncyBreadcrumb: {
                label: 'UI Elements'
            }
        }).state('app.ui.elements', {
            url: '/elements',
            templateUrl: "assets/views/ui_elements.html",
            title: 'Elements',
            icon: 'ti-layout-media-left-alt',
            ncyBreadcrumb: {
                label: 'Elements'
            }
        }).state('app.ui.buttons', {
            url: '/buttons',
            templateUrl: "assets/views/ui_buttons.html",
            title: 'Buttons',
            resolve: loadSequence('spin', 'ladda', 'angular-ladda', 'laddaCtrl'),
            ncyBreadcrumb: {
                label: 'Buttons'
            }
        }).state('app.ui.links', {
            url: '/links',
            templateUrl: "assets/views/ui_links.html",
            title: 'Link Effects',
            ncyBreadcrumb: {
                label: 'Link Effects'
            }
        }).state('app.ui.icons', {
            url: '/icons',
            templateUrl: "assets/views/ui_icons.html",
            title: 'Font Awesome Icons',
            ncyBreadcrumb: {
                label: 'Font Awesome Icons'
            },
            resolve: loadSequence('iconsCtrl')
        }).state('app.ui.lineicons', {
            url: '/line-icons',
            templateUrl: "assets/views/ui_line_icons.html",
            title: 'Linear Icons',
            ncyBreadcrumb: {
                label: 'Linear Icons'
            },
            resolve: loadSequence('iconsCtrl')
        }).state('app.ui.modals', {
            url: '/modals',
            templateUrl: "assets/views/ui_modals.html",
            title: 'Modals',
            ncyBreadcrumb: {
                label: 'Modals'
            },
            resolve: loadSequence('asideCtrl')
        }).state('app.ui.toggle', {
            url: '/toggle',
            templateUrl: "assets/views/ui_toggle.html",
            title: 'Toggle',
            ncyBreadcrumb: {
                label: 'Toggle'
            }
        }).state('app.ui.tabs_accordions', {
            url: '/accordions',
            templateUrl: "assets/views/ui_tabs_accordions.html",
            title: "Tabs & Accordions",
            ncyBreadcrumb: {
                label: 'Tabs & Accordions'
            },
            resolve: loadSequence('vAccordionCtrl')
        }).state('app.ui.panels', {
            url: '/panels',
            templateUrl: "assets/views/ui_panels.html",
            title: 'Panels',
            ncyBreadcrumb: {
                label: 'Panels'
            }
        }).state('app.ui.notifications', {
            url: '/notifications',
            templateUrl: "assets/views/ui_notifications.html",
            title: 'Notifications',
            ncyBreadcrumb: {
                label: 'Notifications'
            },
            resolve: loadSequence('toasterCtrl', 'sweetAlertCtrl')
        }).state('app.ui.treeview', {
            url: '/treeview',
            templateUrl: "assets/views/ui_tree.html",
            title: 'TreeView',
            ncyBreadcrumb: {
                label: 'Treeview'
            },
            resolve: loadSequence('angularBootstrapNavTree', 'treeCtrl')
        }).state('app.ui.media', {
            url: '/media',
            templateUrl: "assets/views/ui_media.html",
            title: 'Media',
            ncyBreadcrumb: {
                label: 'Media'
            }
        }).state('app.ui.nestable', {
            url: '/nestable2',
            templateUrl: "assets/views/ui_nestable.html",
            title: 'Nestable List',
            ncyBreadcrumb: {
                label: 'Nestable List'
            },
            resolve: loadSequence('jquery-nestable-plugin', 'ng-nestable', 'nestableCtrl')
        }).state('app.ui.typography', {
            url: '/typography',
            templateUrl: "assets/views/ui_typography.html",
            title: 'Typography',
            ncyBreadcrumb: {
                label: 'Typography'
            }
        }).state('app.table', {
            url: '/table',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Tables',
            ncyBreadcrumb: {
                label: 'Tables'
            }
        }).state('app.table.basic', {
            url: '/basic',
            templateUrl: "assets/views/table_basic.html",
            title: 'Basic Tables',
            ncyBreadcrumb: {
                label: 'Basic'
            }
        }).state('app.table.responsive', {
            url: '/responsive',
            templateUrl: "assets/views/table_responsive.html",
            title: 'Responsive Tables',
            ncyBreadcrumb: {
                label: 'Responsive'
            }
        }).state('app.table.data', {
            url: '/data',
            templateUrl: "assets/views/table_data.html",
            title: 'ngTable',
            ncyBreadcrumb: {
                label: 'ngTable'
            },
            resolve: loadSequence('ngTable', 'ngTableCtrl')
        }).state('app.table.export', {
            url: '/export',
            templateUrl: "assets/views/table_export.html",
            title: 'Table'
        }).state('app.form', {
            url: '/form',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Forms',
            ncyBreadcrumb: {
                label: 'Forms'
            }
        }).state('app.form.elements', {
            url: '/elements',
            templateUrl: "assets/views/form_elements.html",
            title: 'Forms Elements',
            ncyBreadcrumb: {
                label: 'Elements'
            },
            resolve: loadSequence('ui.select', 'ui.mask', 'monospaced.elastic', 'touchspin-plugin', 'angular-bootstrap-touchspin', 'selectCtrl')
        }).state('app.form.xeditable', {
            url: '/xeditable',
            templateUrl: "assets/views/form_xeditable.html",
            title: 'Angular X-Editable',
            ncyBreadcrumb: {
                label: 'X-Editable'
            },
            resolve: loadSequence('xeditable', 'config-xeditable', 'checklist-model', 'xeditableCtrl')
        }).state('app.form.texteditor', {
            url: '/editor',
            templateUrl: "assets/views/form_text_editor.html",
            title: 'Text Editor',
            ncyBreadcrumb: {
                label: 'Text Editor'
            },
            resolve: loadSequence('ckeditor-plugin', 'ckeditor', 'ckeditorCtrl')
        }).state('app.form.wizard', {
            url: '/wizard',
            templateUrl: "assets/views/form_wizard.html",
            title: 'Form Wizard',
            ncyBreadcrumb: {
                label: 'Wizard'
            },
            resolve: loadSequence('wizardCtrl')
        }).state('app.form.validation', {
            url: '/validation',
            templateUrl: "assets/views/form_validation.html",
            title: 'Form Validation',
            ncyBreadcrumb: {
                label: 'Validation'
            },
            resolve: loadSequence('validationCtrl')
        }).state('app.form.cropping', {
            url: '/image-cropping',
            templateUrl: "assets/views/form_image_cropping.html",
            title: 'Image Cropping',
            ncyBreadcrumb: {
                label: 'Image Cropping'
            },
            resolve: loadSequence('ngImgCrop', 'cropCtrl')
        }).state('app.form.upload', {
            url: '/file-upload',
            templateUrl: "assets/views/form_file_upload.html",
            title: 'Multiple File Upload',
            ncyBreadcrumb: {
                label: 'File Upload'
            },
            resolve: loadSequence('angularFileUpload', 'uploadCtrl')
        }).state('app.pages', {
            url: '/pages',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Pages',
            ncyBreadcrumb: {
                label: 'Pages'
            }
        }).state('app.pages.user', {
            url: '/user',
            templateUrl: "assets/views/pages_user_profile.html",
            title: 'User Profile',
            ncyBreadcrumb: {
                label: 'User Profile'
            },
            resolve: loadSequence('flow', 'userCtrl')
        }).state('app.pages.invoice', {
            url: '/invoice',
            templateUrl: "assets/views/pages_invoice.html",
            title: 'Invoice',
            ncyBreadcrumb: {
                label: 'Invoice'
            }
        }).state('app.pages.timeline', {
            url: '/timeline',
            templateUrl: "assets/views/pages_timeline.html",
            title: 'Timeline',
            ncyBreadcrumb: {
                label: 'Timeline'
            },
            resolve: loadSequence('ngMap')
        }).state('app.pages.calendar', {
            url: '/calendar',
            templateUrl: "assets/views/pages_calendar.html",
            title: 'Calendar',
            ncyBreadcrumb: {
                label: 'Calendar'
            },
            resolve: loadSequence('moment', 'mwl.calendar', 'calendarCtrl')
        }).state('app.pages.messages', {
            url: '/messages',
            templateUrl: "assets/views/pages_messages.html",
            resolve: loadSequence('truncate', 'htmlToPlaintext', 'inboxCtrl')
        }).state('app.pages.messages.inbox', {
            url: '/inbox/:inboxID',
            templateUrl: "assets/views/pages_inbox.html",
            controller: 'ViewMessageCrtl'
        }).state('app.pages.blank', {
            url: '/blank',
            templateUrl: "assets/views/pages_blank_page.html",
            ncyBreadcrumb: {
                label: 'Starter Page'
            }
        }).state('app.utilities', {
            url: '/utilities',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Utilities',
            ncyBreadcrumb: {
                label: 'Utilities'
            }
        }).state('app.utilities.search', {
            url: '/search',
            templateUrl: "assets/views/utility_search_result.html",
            title: 'Search Results',
            ncyBreadcrumb: {
                label: 'Search Results'
            }
        }).state('app.utilities.pricing', {
            url: '/pricing',
            templateUrl: "assets/views/utility_pricing_table.html",
            title: 'Pricing Table',
            ncyBreadcrumb: {
                label: 'Pricing Table'
            }
        }).state('app.maps', {
            url: "/maps",
            templateUrl: "assets/views/maps.html",
            resolve: loadSequence('ngMap', 'mapsCtrl'),
            title: "Maps",
            ncyBreadcrumb: {
                label: 'Maps'
            }
        }).state('app.register', {
            url: "/register",
            templateUrl: "assets/views/register.html",
            title: "Register",
            controller: 'loginCtrl',
            ncyBreadcrumb: {
                label: 'Register'
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

                    $http.post('/api/users/login', newUser)
                        .success(function (data) {
                            console.log (data.user[0].imageUrl);
                            $cookieStore.put('idlogin', data.user[0]._id);
                            $location.path('/app/home');

                        })
                        .error(function (data) {
                            swal("Opps!", "Usuario o password incorrecto!", "error")
                            console.log(data);

                        });


            };
            // Funcion para registrar a un usuario
            $scope.registerUser = function(newUser) {
                swal({   title: "¿Estas seguro de registrar?",
                        text: "Una vez registrado se volvera a la pagina de inicio!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#6cdd55",
                        confirmButtonText: "Si, registralo!",
                        closeOnConfirm: true },
                    function(){
                         var formData = new FormData();
                         var username= newUser.username;
                         var file = $scope.file;
                        formData.append("file", file);
                            $http.post('/api/users',newUser)
                                  .success(function (data) {

                                })
                            .error(function (data) {
                            console.log('Error: ' + data);
                            });

                        $http.put('/api/users/upload/'+ username, formData, {
                            headers: {
                                "Content-type": undefined
                            },
                             transformRequest: angular.identity}
                            )
                            .success(function (data) {

                                   $location.path('/app/signin');
                            })
                            .error(function (data) {
                            console.log('Error: ' + data);
                            });

                    });

            };


        }]);
        app.factory('User',function($resource){ //Step 2
            //Step 3
            return $resource('/api/users');
        })
        app.controller('usersCtrl',['$scope', '$location', '$cookies', '$cookieStore', '$http','ngTableParams', 'User', function($scope, $location,$cookies, $cookieStore, $http, ngTableParams, User) {

            var params = {
                page: 1,
                count: 5
            };

            var settings = {
                total: 0,
                counts: [5, 10, 15],
                getData: function($defer, params) {
                    User.get(params.url(), function(response) {
                        params.total(response.total);
                        $defer.resolve(response.results);
                    });
                }
            };

            $scope.tableParams = new ngTableParams(params, settings);
            /*
            $scope.newUser = {};
            $scope.user = {};
            $scope.selected = false;
            // Obtenemos todos los datos de la base de datos
            $http.get('/api/users').success(function (data) {
                $scope.users = data;
                console.log(data);
            })
                .error(function (data) {
                    console.log('Error: ' + data);
                });*/
            // Funci�n que borra un objeto usuario conocido su id
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
                                    location.href = '#/app/home';
                                    location.reload('#/app/home');
                            })
                            .error(function(data) {
                            console.log('Error: ' + data);
                            });
                    });
            };
            // Funci�n que obtiene un objeto usuario conocido su id
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


// Funci�n que obtiene un objeto usuario conocido su id
            $http.get('/api/users/' + id)
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
            // Funci�n para editar los datos de un usuario
            $scope.updateUser = function(newUser) {
                newUser.rol= $scope.user.rol;
                newUser.imageUrl= $scope.user.imageUrl;
                console.log (newUser);
                if ((!newUser.name) && (!newUser.username) && (!newUser.email) && (!newUser.password)){
                    $scope.user.n = "Nombre Completo es requerido";
                    $scope.user.e = "Correo Electronico es requerido";
                    $scope.user.u = "Usuario es requerido";
                    $scope.user.p = "Password es requerido";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.name){
                    $scope.user.n = "Nombre Completo es requerido";
                    $scope.user.u = "";
                    $scope.user.e = "";
                    $scope.user.p = "";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }

                else if (!newUser.username){
                    $scope.user.n = "";
                    $scope.user.u = "Usuario es requerido";
                    $scope.user.e = "";
                    $scope.user.p = "";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.email){
                    $scope.user.n = "";
                    $scope.user.u = "";
                    $scope.user.e = "Correo Electronico es requerido";
                    $scope.user.p = "";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }
                else if (!newUser.password){
                    $scope.user.n = "";
                    $scope.user.u = "";
                    $scope.user.e = "";
                    $scope.user.p = "Password es requerido";
                    swal("Opps!", "Faltan datos obligatorios!", "error")
                }

                else {
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
                }
            };

        }]);
        app.controller('profileCtrl',['$scope', '$location', '$cookies', '$cookieStore', '$http', function($scope, $location,$cookies, $cookieStore, $http) {
            $scope.newUser = {};
            $scope.user = {};
            $scope.selected = false;
            var id = $cookieStore.get('idlogin');

            $scope.getProfile = function(id) {
                console.log (id);
                $cookieStore.put('id', id);
                location.href = '#/app/profile';
                location.reload('#/app/profile');

            };
// Funci�n que obtiene un objeto usuario conocido su id
            $http.get('/api/users/' + id)
                .success(function(data) {
                    $scope.user._id = data._id;
                    $scope.user.username = data.username;
                    $scope.user.name = data.name;
                    $scope.user.email = data.email;
                    $scope.user.phone = data.phone;
                    $scope.user.gender = data.gender;
                    $scope.user.ziCode = data.zipCode;
                    $scope.user.city = data.city;
                    $scope.user.rol = data.rol;
                    $scope.user.imageUrl = data.imageUrl;
                    console.log (data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });


        }]);

       /* app.controller('MapCtrl', ['$scope', function ($scope) {

            $scope.map = {
                center: {
                    latitude: 40.454018,
                    longitude: -3.509205
                },
                zoom: 12,
                options : {
                    scrollwheel: false
                },
                control: {}
            };
            $scope.marker = {
                id: 0,
                coords: {
                    latitude: 40.454018,
                    longitude: -3.509205
                },
                options: {
                    draggable: true
                }
            };
        }]);
        */
        app.controller('MapCtrl', ['$scope', function ($scope) {

            var markerId = 0;

            function refresh(marker) {
                $scope.map.control.refresh({latitude: marker.latitude,
                    longitude: marker.longitude});
            }

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

            createByCoords(40.454018, -3.509205, function (marker) {
                marker.options.labelContent = 'Autentia';
                $scope.autentiaMarker = marker;
                refresh(marker);
            });
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