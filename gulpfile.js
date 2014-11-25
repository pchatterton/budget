// Include Gulp
var gulp = require('gulp');

// Include our plugins
var jshint = require('gulp-jshint'); // Detect errors and potential problems in JavaScript code
var stylus = require('gulp-stylus'); //Expressive, dynamic, and robust CSS
var nib = require('nib'); // Library for Stylus CSS,provides robust cross-browser CSS3 mixins
var nodemon = require('gulp-nodemon'); // Restarts app during development
var livereload = require('gulp-livereload'); // Live reloading
var clean = require('gulp-clean'); // Plugin for removing files or folders
var ngAnnotate = require('gulp-ng-annotate'); // Add angularjs dependency injection annotations
var uglify = require('gulp-uglify'); // Minify JavaScript with UglifyJS2
var concat = require('gulp-concat'); // Concat files in order
var notify = require('gulp-notify') // Send messages to Mac Notification Center
var autoprefixer = require('gulp-autoprefixer'); // Set target browsers, css visual cascade
var concatcss = require('gulp-concat-css');
var minifycss = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace') // Replace blocks in HTML

// *******************
// DEVELOPMENT
// *******************

// Stylus Task
gulp.task('stylus', function() {
	return gulp.src(
			'./public/css/*.styl',
			'./public/*/*.styl',
			'./public/*/*/*.styl',
			'./public/css/*/*/*.styl'
		)
		.pipe(stylus({error: true, use:[nib()]}))
		.pipe(gulp.dest('./public/compiled-css'))
});

// Lint Task
gulp.task('lint', function() {
	return gulp.src([
			'./public/*.js',
			'./public/*/*.js',
			'./public/*/*/*.js',
			'!./public/build/js/*js',
			'!./public/components/**/*.js'
		])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('nodemon', function() {
	nodemon({
		script: 'server.js',
		ext: 'js',
		env: {
			'NODE_ENV': 'development'
		}
	})
		.on('start', ['watch'])
		.on('change', ['watch'])
		.on('restart', function() {
			console.log('server.js restarted')
		});
});

// Watch files for changes
gulp.task('watch', function() {
	gulp.watch([
		'./public/css/*.styl',
		'./public/*/*.styl',
		'./public/*/*/*.styl',
		'./public/css/*/*/*.styl'
	], [
		'stylus'
	])
	gulp.watch([
		'./public/*.js',
		'./public/*/*.js',
		'./public/*/*/*.js',
		'!/public/build/js/*.js'
	], [
		'lint'
	]);
	livereload.listen();
	gulp.watch([
		'./public/*',
		'./public/*/*',
		'./public/*/*/*',
		'./public/*/*/*/*'
	]).on('change', livereload.changed);

});

// *******************
// PRODUCTION
// *******************

gulp.task('clean', function() {
	return gulp.src('./public/build/*',{read: false})
});

gulp.task('scripts', function() {
	return gulp.src(
		'./public/*.js',
		'./public/*/*.js',
		'./public/*/*/*.js',
		'!./public/components/**/*.js'
	)
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('./public/build/js'))
		.pipe(notify({message: 'Scripts have been minified and concatenated'}))
});

gulp.task('styles', function(){
  return gulp.src(['./public/compiled-css/*.css'])
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concatcss('main.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/build/css'))
    .pipe(notify({message: 'Styles have been minified and concatenated'}))
});

gulp.task('replaceHtml', function() {
	gulp.src('./public/index.html')
		.pipe(htmlreplace({
			'css': 'build/css/main.min.css',
	        'js': 'build/js/all.min.js',
	        'bowerToCDN': [
	          '//code.jquery.com/jquery-1.11.0.min.js',
	          'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js',
	          '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular.min.js',
	          '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.11/angular-ui-router.min.js',
	          '//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.11.2/ui-bootstrap.min.js'
	        ]
		}))
		.pipe(gulp.dest('./public/'))
		.pipe(notify({message: 'HTML has been replaced for production'}))
});

// Gulp Development
gulp.task('default', ['stylus', 'lint', 'nodemon']);

// Gulp Production
gulp.task('production', ['clean'], function() {
    gulp.start('scripts', 'styles', 'replaceHtml');
});
