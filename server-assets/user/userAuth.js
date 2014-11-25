// server-assets/config/auth.js
'use strict'

var UserService = require('./userService');

module.exports = {

	emailExists: function(req, res) {
		var email = req.params.email;

		UserService.findUserByEmail(email).then(function(user) {
			console.log(user);
			if(!user.length) {
				res.status(200).send(true);
			} else {
				res.status(200).send(false);
			}
		}, function(err) {
			res.send(err);
		})
	},

	usernameExists: function(req, res) {
		var username = req.params.username;

		UserService.findUserByUsername(username).then(function(user) {
			console.log(user);
			if(!user.length) {
				res.status(200).send(true);
			} else {
				res.status(200).send(false);
			}
		}, function(err) {
			res.send(err);
		})
	}
}

/*
 * Route middleware to ensure user is authenticated.
 */

 // exports.requireAuth = function requireAuth(req, res, next) {
 // 	if (req.isAuthenticated()) {return next(); }
 // 	return res.status(401).end();
 // 	res.redirect('/login')
 // }

 // exports.budget = {
 // 	isAuthorized: function(req, res, next) {
 // 		// check is user is authorized to access budget
 // 		// by comparing user id's
 // 	}
 // }