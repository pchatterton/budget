// server-assets/user/userService.js
'use strict'

var Promise = require('bluebird');

var User = require('./userModel.js');

Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);

var services = {
	findUserByUsername: findUserByUsername,
	findUserByEmail: findUserByEmail
}

module.exports = services;

function findUserByUsername(username) {
	return User.findAsync({'username': username});
};

function findUserByEmail(email) {
	return User.findAsync({'local.email': email});
};
