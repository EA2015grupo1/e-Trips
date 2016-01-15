angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('login', {
      url: '/page1',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('colleges', {
      url: '/page14/:city',
      templateUrl: 'templates/colleges.html',
      controller: 'collegesCtrl'
    })

    .state('perfil-student', {
      url: '/page5/:city/:college/:id',
      templateUrl: 'templates/perfil-student.html',
      controller: 'perfil-studentCtrl'
    })
    .state('perfil-request', {
      url: '/page37/:user/:id',
      templateUrl: 'templates/perfil-request.html',
      controller: 'perfil-requestCtrl'
    })
    .state('students', {
      url: '/page34/:city/:college',
      templateUrl: 'templates/students.html',
      controller: 'studentsCtrl'
    })

    .state('registro', {
      url: '/page3',
      templateUrl: 'templates/registro.html',
      controller: 'registerCtrl'
    })
    .state('editar', {
      url: '/page2/:id',
      templateUrl: 'templates/editar.html',
      controller: 'editarCtrl'
    })
    .state('profile', {
      url: '/page12/:id',
      templateUrl: 'templates/perfil.html',
      controller: 'perfilCtrl'
    })

    .state('menu.requests', {
      url: '/page19',
      views: {
        'side-menu21': {
          templateUrl: 'templates/requests.html',
          controller: 'requestsCtrl'
        }
      }
    })
    .state('menu.friends', {
      url: '/page23',
      views: {
        'side-menu21': {
          templateUrl: 'templates/friends.html',
          controller: 'friendsCtrl'
        }
      }
    })


    .state('menu.cities', {
      url: '/page7',
      views: {
        'side-menu21': {
          templateUrl: 'templates/cities.html',
          controller: 'citiesCtrl'
        }
      }
    })


  /*  .state('menu.perfil', {
      url: '/page12',
      views: {
        'side-menu21': {
          templateUrl: 'templates/perfil.html',
          controller: 'perfilCtrl'
        }
      }
    })*/



    .state('menu', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'templates/menu.html',
      controller:'perfilCtrl'
    })




    .state('menu.posicion', {
      url: '/page8/:id',
      views: {
        'side-menu21': {
          templateUrl: 'templates/posicion.html',
          controller: 'posicionCtrl'
        }
      }
    })
    .state('menu.chat', {
      url: '/page24/',
      views: {
        'side-menu21': {
          templateUrl: 'templates/chat.html',
          controller: 'chatCtrl'
        }
      }
    })

    .state('menu.online', {
      url: '/page25/',
      views: {
        'side-menu21': {
          templateUrl: 'templates/online.html',
          controller: 'chatCtrl'
        }
      }
    })

    .state('menu.girls', {
      url: '/page15',
      views: {
        'side-menu21': {
          templateUrl: 'templates/girls.html',
          controller: 'girlsCtrl'
        }
      }
    })

    .state('menu.boys', {
      url: '/page17',
      views: {
        'side-menu21': {
          templateUrl: 'templates/boys.html',
          controller: 'boysCtrl'
        }
      }
    })

    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1');

});
