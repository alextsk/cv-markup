var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
//var minifyCSS = require('gulp-csso');
//var concat = require('gulp-concat');
//var sourcemaps = require('gulp-sourcemaps');

var deploy      = require('gulp-gh-pages');

gulp.task('html', function(){
  return gulp.src('templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/html'))
});

gulp.task('css', function(){
  return gulp.src('templates/*.styl')
    .pipe(stylus())
//    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('default', [ 'html', 'css']);

gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});