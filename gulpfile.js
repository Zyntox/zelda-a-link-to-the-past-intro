var gulp = require('gulp'),
		sass = require('gulp-sass'),
		minify = require('gulp-minify'),
		browserSync = require('browser-sync').create();

// Test task for debugging purposes.
gulp.task('test', function(){
	console.log('Test');
});


// Browsersync init
gulp.task('browserSync', function(){
	browserSync.init({
		browser: 'google chrome',
		server: {
			baseDir: [ './', './dist', './node_modules' ]
		},
	})
});

// Sass Compile (single-use)
gulp.task('compileSass', function(){
	return gulp.src('dev/stylesheets/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/stylesheets/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('compileJs', function(){
	return gulp.src('dev/js/*.js')
	.pipe(minify({
		ext:{
				src:'-debug.js',
      	min:'.js'
    }
	}))
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({
		stream: true
	}))
})



gulp.task('watch', ['browserSync', 'compileSass', 'compileJs'], function(){
	gulp.watch('dev/stylesheets/scss/**/*', ['compileSass']);
	gulp.watch('dev/js/*.js', ['compileJs']);
});
