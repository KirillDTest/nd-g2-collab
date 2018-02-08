const gulp = require('gulp');
// const image = require('gulp-image');
const jade = require('gulp-jade');
const sass= require('gulp-sass');
const connect = require('gulp-connect')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')

// gulp.task('image-comp', function(){
// 	gulp.src(['./src/img/**/*.jpg','./src/img/**/*.png'])
// 		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
// 		.pipe(image())
// 		.pipe(gulp.dest('./dist/img'))
// 		.pipe(connect.reload())
// })

gulp.task('html', function(){
	gulp.src('./src/**/*.jade')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(jade())
		.pipe(gulp.dest('./dist/'))
		.pipe(connect.reload())
})

gulp.task('css', function(){
	gulp.src(['./src/style/**/*.scss', './src/style/**/*.sass'])
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass())
		.pipe(gulp.dest('./dist/style'))
		.pipe(connect.reload())
})

gulp.task('watch', function(){
	gulp.watch(['src/style/**/*.scss', 'src/style/**/*.sass'], {cwd:'./'}, ['css'])
	gulp.watch('src/**/*.jade', {cwd:'./'}, ['html'])
	gulp.watch(['src/img/**/*.jpg','src/img/**/*.png'], {cwd:'./'}, ['image-comp'])
})

gulp.task('connect', function(){
	connect.server({
		port: 9000,
		livereload: true,
		root: './dist'
	})
})

gulp.task('default', ['css', 'html', 'watch', 'connect'])
