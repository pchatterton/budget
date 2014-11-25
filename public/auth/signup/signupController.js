var app = angular.module('budget');
"use strict";

app.controller('SignupController', function($scope, authService) {

	function validateForm() {
		$scope.signupForm.name.$dirty = true;
		$scope.signupForm.email.$dirty = true;

	};

	$scope.signupUser = function() {
		if($scope.signupForm.$invalid) {
			validateForm();
		} else {
			$scope.newUser.bdayMonth = $scope.bdayMonth + 1;
			authService.signup($scope.newUser)
	      		.then(function(user){
	      			console.log('user: ' + user)
	      	});
      	}
	}

	$scope.validateEmail = function() {
		$scope.signupForm.email.$setValidity('emailTaken', true);
		if(!$scope.signupForm.email.$invalid) {
			authService.validateEmail($scope.newUser.email)
				.then(function(res) {
					if(!res.data) {
						$scope.signupForm.email.$setValidity('emailTaken', false);
					} else {
						$scope.signupForm.email.$setValidity('emailTaken', true);
					}
			});
		}
	};

	$scope.validateUsername = function() {
		$scope.signupForm.username.$setValidity('usernameTaken', true);
		if(!$scope.signupForm.username.$invalid) {
			authService.validateUsername($scope.newUser.username)
				.then(function(res) {
					if(!res.data) {
						$scope.signupForm.username.$setValidity('usernameTaken', false);
					} else {
						$scope.signupForm.username.$setValidity('usernameTaken', true);
					}
			});
		}
	};

	$scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.bdayMonth = 0;
});