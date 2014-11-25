'use strict'

var express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	session	= require('express-session'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	passportLocal = require('passport-local'),
	bcrypt = require('bcrypt-nodejs'),
	flash = require('connect-flash'),
	user = require('./server-assets/user/userController'),

	port = 8888,
	app = express(),
	connection = mongoose.connection,
	mongoRef = require('./server-assets/config/database')


//User = require('./server-assets/controllers/userCtrl')

// App Configuration
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: 'budgets-are-smart',
	name: 'budgetApp',
	proxy: true,
	resave: true,
	saveUninitialized: true
}));
app.use(flash());

// Passport
require('./server-assets/user/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./server-assets/config/routes')(app, passport);


// Db connection
mongoose.connect(mongoRef.url);
connection.once('open', function(){
	app.listen(port, function(){
		console.log('We are connected to Mongodb on ' + port)
		console.log('Now try to break me....')
	});
})