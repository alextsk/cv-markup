var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
//var minifyCSS = require('gulp-csso');
//var concat = require('gulp-concat');
//var sourcemaps = require('gulp-sourcemaps');
var deploy      = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();

gulp.task('html', function(){
  return gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('css', function(){
  return gulp.src('src/*.styl')
    .pipe(stylus())
//    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('img', function(){
  return gulp.src('img/*.*')
    .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function(){
  return gulp.src('fonts/*.*')
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('build', [ 'html', 'css', 'img', 'fonts']);

gulp.task('deploy', ['build'], function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('serve', ['build'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/**/*.styl", ['css']);
    gulp.watch("src/**.pug", ['html'])
    gulp.watch("dist/**/*.*").on('change', browserSync.reload);
});

gulp.task('default', ['serve'])