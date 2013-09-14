'use strict';

angular.module('todo.controllers', [])
	.controller(
		'mainCtrl', 
		['$scope', 'FBURL', 'angularFire', function($scope, FBURL, angularFire) {
			var ref = new Firebase(FBURL + '/syncedValue');
			angularFire(ref, $scope, 'syncedValue');
		}]);