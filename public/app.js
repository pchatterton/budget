var app = angular.module('budget', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngMessages']);
"use strict";

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('/', {
      url: '/',
      templateUrl: 'home/home.html',
      controller: 'HomeController'
    })
    .state('features', {
    	url: '/features',
    	templateUrl: 'features/features.html',
    	// controller: 'featuresController'
    })
    .state('purpose', {
    	url: '/purpose',
    	templateUrl: 'purpose/purpose.html',
    	// controller: 'purposeController'
    })
    .state('about', {
    	url: '/about',
    	templateUrl: 'about/about.html',
    	// controller: 'aboutController'
    })
    .state('auth', {
        abstract: true,
        template: '<div class="main-container"><div class="auth-container"><header ng-include="\'main/header.html\'" ng-controller="headerController"></header><div class="ui-view-container" ui-view></div></div></div>'
    })
    .state('login', {
        parent: 'auth',
    	url: '/login',
    	templateUrl: 'auth/login/login.html',
    	controller: 'LoginController'
    })
    .state('signup', {
        parent: 'auth',
    	url: '/signup',
    	templateUrl: 'auth/signup/signup.html',
    	controller: 'SignupController'
    })
    .state('newBudget', {
        parent: 'auth',
        url: '/new-budget',
        templateUrl: 'budget/newBudget/newBudget.html',
        controller: 'newBudgetController'
    })
})