/**
 * Modul: TodoApp
 * 
 * @param {type} param
 */
angular.module('TodoApp', ['ionic', 'TodoApp.controllers', 'TodoApp.services'])
.constant('URLGetData', {
  url: 'http://localhost:8100/test/?option=1'
  })
  .constant('URLSave', {
  url: 'http://localhost:8100/test/?option=2'
  })
  .constant('URLDelete', {
  url: 'http://localhost:8100/test/?option=3'
  })
  .constant('URLUpdate', {
  url: 'http://localhost:8100/test/?option=4'
  })
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

/**
 * Config to load state
 * 
 * @param {type} $stateProvider
 * @param {type} $urlRouterProvider
 * @returns {undefined}
 */
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('MainPage', {
    url: '/MainPage',
    templateUrl: 'templates/MainPage.html',
    controller: 'TodoCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/MainPage');

});
