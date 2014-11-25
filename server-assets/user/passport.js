// server-assets/config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy


// load up the user model
var User = require('./userModel')

// expose this function to our app using module.exports
module.exports = function(passport) {
	// =============================================
	// passport session setup ======================
	// =============================================

	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user._id)
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		})
	});

	// =============================================
	// Local Signup ================================
	// =============================================

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // pass back the entire request to the callback
	}, 
		function(req, email, password, done) {
			process.nextTick(function() {
				User.findOne({'local.email' : email }, function(err, user) {
					if(err)
						return done(err);
					if(user) {
						console.log('email taken')
						return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
					} else {
						console.log('else')
						var newUser = new User();

						newUser.name = req.body.name;
						newUser.local.email = email;
						newUser.username = req.body.username
						newUser.local.password = newUser.generateHash(password);
						newUser.birthday.day = req.body.bdayDay;
						newUser.birthday.month = req.body.bdayMonth;

						newUser.save(function(err) {
							if(err) {
								throw err;
							}
							console.log('saved!')
							return done(null, newUser);
						})
					}
				})
			})
		}
	));

	// =============================================
	// Local LOGIN ================================
	// =============================================

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done) {
		User.findOne({'local.email' : email }, function(err, user) {
			if(err)
				return done(err);

			if(!user)
				return done(null, false, req.flash('loginMessage' , 'No user found.'));

			return done(null, user);
		});
	}
	));
}