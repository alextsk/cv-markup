var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
//var minifyCSS = require('gulp-csso');
//var concat = require('gulp-concat');
//var sourcemaps = require('gulp-sourcemaps');
var deploy      = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();

gulp.task('html', function(){
  return gulp.src('templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('css', function(){
  return gulp.src('templates/*.styl')
    .pipe(stylus())
//    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('build', [ 'html', 'css']);

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

gulp.task('serve', ['html', 'css'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("templates/**/*.styl", ['css']);
    gulp.watch("templates/**.pug", ['html'])
    gulp.watch("dist/**/*.*").on('change', browserSync.reload);
});

gulp.task('default', ['serve'])