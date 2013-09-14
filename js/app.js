'use strict';

angular.module('todo', ['todo.config', 'todo.controllers', 'firebase'])
	.config(['$routeProvider', function($routeProvider) {
     	$routeProvider.when('/', {
        	templateUrl: 'templates/all.html',
        	controller: 'mainCtrl'
      	});

      	$routeProvider.otherwise({redirectTo: '/'});
    }])
	.run(['FBURL', function(FBURL) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
      }
   }]);
