// server-assets/routes.js
'use strict';

var userAuth = require('../user/userAuth');

module.exports = function(app, passport) {

	// Login and Signup routes
	app.post('/auth/signup', passport.authenticate('local-signup', {
		successRedirect : '/#/login',
		failureRedirect : '/#/signup',
		failureFlash : true
	}));

	app.post('/auth/login', passport.authenticate('local-login', {
		successRedirect : '/new-budget',
		failureRedirect : '/login',
		failureFlash : true
	}));

	app.get('/newBudget', function(req, res) {
		console.log('hello');
		res.redirect('/#/new-budget')
	})

	// Check if email and username is available
	app.get('/auth/check_username/:username', userAuth.usernameExists);
	app.get('/auth/check_email/:email', userAuth.emailExists)

	// User routes
	var users = require('../user/userController')
}