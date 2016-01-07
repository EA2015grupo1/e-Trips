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
      url: '/page14',
      templateUrl: 'templates/colleges.html',
      controller: 'collegesCtrl'
    })



    .state('registro', {
      url: '/page3',
      templateUrl: 'templates/registro.html',
      controller: 'loginCtrl'
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





    .state('menu.perfil', {
      url: '/page12',
      views: {
        'side-menu21': {
          templateUrl: 'templates/perfil.html',
          controller: 'perfilCtrl'
        }
      }
    })

    .state('prefil-student', {
      url: '/page16',
      templateUrl: 'templates/perfil-student.html',
      controller: 'perfil-studentCtrl'
    })





    .state('editar', {
      url: '/page2',
      templateUrl: 'templates/editar.html',
      controller: 'editarCtrl'
    })




    .state('menu', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })




    .state('menu.posicion', {
      url: '/page8',
      views: {
        'side-menu21': {
          templateUrl: 'templates/posicion.html',
          controller: 'posicionCtrl'
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
