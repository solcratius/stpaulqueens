
///////////////////////////////////////////////////////////////////////////
// Configuration
///////////////////////////////////////////////////////////////////////////

var config = {
	jsConcatFiles: [
		'./app/js/landing.js', 
		'./app/js/main.js'
	], 
	buildFilesFoldersRemove:[
		'build/scss/', 
		'build/js/!(*.min.js)',
		'build/bower.json',
		// 'build/bower_components/',
		'build/images/*.ai',
		'build/maps/'
	]
};


///////////////////////////////////////////////////////////////////////////
// Required
///////////////////////////////////////////////////////////////////////////

var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	del = require('del'),
	reload = browserSync.reload,
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify');


///////////////////////////////////////////////////////////////////////////
// Log Errors
///////////////////////////////////////////////////////////////////////////

function errorlog(err){
	console.error(err.message);
	this.emit('end');
}


///////////////////////////////////////////////////////////////////////////
// Scripts Tasks
///////////////////////////////////////////////////////////////////////////

gulp.task('scripts', function() {
	return gulp.src(config.jsConcatFiles)
	.pipe(sourcemaps.init())
	.pipe(concat('temp.js'))
	.pipe(uglify())
	.on('error', errorlog)
	.pipe(rename('main.min.js'))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('./app/js'))
	.pipe(reload({stream:true}));
});


///////////////////////////////////////////////////////////////////////////
// Styles Tasks
///////////////////////////////////////////////////////////////////////////

gulp.task('styles', function() {
	gulp.src('app/scss/styles.scss')	
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'expanded'}))//'compressed'}))//
	.on('error', errorlog)
	.pipe(autoprefixer({
        browsers: ['last 3 versions', 'Firefox < 20', 'IE 8', 'IE 9', 'IE 10'],
        cascade: false
    }))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('app/css/'))
	.pipe(reload({stream:true}));
});


///////////////////////////////////////////////////////////////////////////
// HTML Tasks
///////////////////////////////////////////////////////////////////////////

gulp.task('html', function() {
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}));
});


///////////////////////////////////////////////////////////////////////////
// Build Tasks
///////////////////////////////////////////////////////////////////////////

gulp.task('build:cleanfolder', function() {
	return del([
		'build/**'
	]);
});


gulp.task('build:copy', ['build:cleanfolder'], function() {
	return gulp.src('app/**/*/')
	.pipe(gulp.dest('build/'));
});


gulp.task('build:remove', ['build:copy'], function() {
	return del(config.buildFilesFoldersRemove);
});


gulp.task('build', ['build:copy', 'build:remove']);


gulp.task('build:serve', function() {
	// browserSync({
	// 	server:{
	// 		baseDir: './build/'
	// 	}
	// });
	var files = [
			'**/*.php',
			'**/*.html',
			'**/*.{png,jpg,gif}',
			'**/*.{svg}'
		];
	browserSync.init(files, {

		// Read here http://www.browsersync.io/docs/options/
		proxy: "http://localhost:8888/stpaulqueens/build/",

		// port: 8080,

		// Tunnel the Browsersync server through a random Public URL
		// tunnel: true,

		// Attempt to use the URL "http://my-private-site.localtunnel.me"
		// tunnel: "ppress",

		// Inject CSS changes
		injectChanges: true

	});
});


///////////////////////////////////////////////////////////////////////////
// Browser-Sync Tasks
///////////////////////////////////////////////////////////////////////////

gulp.task('browser-sync', function() {
	// browserSync({
	// 	server:{
	// 		baseDir: './app/'
	// 	}
	// });

	var files = [
			'**/*.php',
			'**/*.html',
			'**/*.{png,jpg,gif}',
			'**/*.{svg}'
		];
	browserSync.init(files, {

		// Read here http://www.browsersync.io/docs/options/
		proxy: "http://localhost:8888/stpaulqueens/app/",

		// port: 8080,

		// Tunnel the Browsersync server through a random Public URL
		// tunnel: true,

		// Attempt to use the URL "http://my-private-site.localtunnel.me"
		// tunnel: "ppress",

		// Inject CSS changes
		injectChanges: true

	});
});


///////////////////////////////////////////////////////////////////////////
// Watch Tasks
///////////////////////////////////////////////////////////////////////////

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['styles']);
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/**/*.html', ['html']);
});


///////////////////////////////////////////////////////////////////////////
// Default Task
///////////////////////////////////////////////////////////////////////////

gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'watch']);
