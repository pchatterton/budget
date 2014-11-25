var app = angular.module('budget');

app.service('authService', function($http) {

  this.login = function(user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    }).then(function(res) {
      return res.data;
    });
  };

  this.signup = function(user){
    return $http({
      method: 'POST',
      url: 'auth/signup',
      data: user
    }).then(function(res){
      return res.data;
    });
  };

  this.validateEmail = function(emailVal) {
    return $http({
      method: 'GET',
      url: 'auth/check_email/' + emailVal
    });
  };

  this.validateUsername = function(usernameVal) {
    return $http({
      method: 'GET',
      url: 'auth/check_username/' + usernameVal
    });
  };
});