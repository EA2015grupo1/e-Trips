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





    .state('registro', {
      url: '/page3',
      templateUrl: 'templates/registro.html',
      controller: 'registroCtrl'
    })





    .state('position', {
      url: '/page7',
      templateUrl: 'templates/position.html',
      controller: 'MapCtrl'
    })





    .state('perfil', {
      url: '/page12',
      templateUrl: 'templates/perfil.html',
      controller: 'perfilCtrl'
    })





    .state('editar', {
      url: '/page2',
      templateUrl: 'templates/editar.html',
      controller: 'editarCtrl'
    })


    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1');

});
