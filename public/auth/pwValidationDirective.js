var app = angular.module('budget');

app.directive('validatePasswordCheck', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue, $scope) {
				var noMatch = viewValue != scope.signupForm.password.$viewValue;
				ctrl.$setValidity('noMatch', !noMatch);
			})
		}
	}
});