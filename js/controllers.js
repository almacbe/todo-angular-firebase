'use strict';

angular.module('todo.controllers', [])
	.controller(
		'mainCtrl', 
		['$scope', '$filter', 'FBURL', 'Firebase', 'angularFireCollection', function($scope, $filter, FBURL, Firebase, angularFireCollection) {
			$scope.newTodo = {'id': null, 'text': '', 'done': false};
			$scope.editing = [];
			
			var ref = new Firebase(FBURL + '/todo_list');
			$scope.todoList = angularFireCollection(ref);;

			$scope.addTodo = function() {
				if($scope.newTodo.text != '' ) {
					$scope.todoList.add($scope.newTodo);
					$scope.newTodo = {'id': null, 'text': '', 'done': false};
				}
			}

			$scope.getClassForTask = function(index) {
				if (index in $scope.editing && $scope.editing[index]) {
					return 'editing';
				}; 

				if ($scope.todoList[index].done) {
					return 'completed';
				};

				return '';
			}

			$scope.removeTodo = function(taskToRemove) {
				$scope.todoList.remove(taskToRemove);
			}

			$scope.areTasksCompleted = function() {
				return $scope.numberOfCompletedTask() > 0;
			}

			$scope.numberOfCompletedTask = function() {
				return $scope.getCompletedTask().length;
			}

			$scope.numberOfLeftTasks = function() {
				return $filter('filter')($scope.todoList,{done: false}).length;
			}

			$scope.getCompletedTask = function() {
				return $filter('filter')($scope.todoList,{done: true});
			}

			$scope.removeCompletedTask = function() {
				var taskToRemove = $scope.getCompletedTask();
				for (var i = taskToRemove.length - 1; i >= 0; i--) {
					$scope.removeTodo(taskToRemove[i]);
				};
			}

			$scope.dblclickEditTask = function (index) {
				if (index in $scope.editing) {
					$scope.editing[index] = true;
				} else {
					$scope.editing[index] = true;
				}
			}
		}]);