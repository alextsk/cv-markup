var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var originalStylus = require('gulp-stylus').stylus
var data = require('gulp-data');
const fs = require('fs');
var path = require('path');
//var minifyCSS = require('gulp-csso');
//var concat = require('gulp-concat');
//var sourcemaps = require('gulp-sourcemaps');
var gulpDeploy      = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();
var del = require('del');

function html() {
  return gulp.src('src/*.pug')
    .pipe(
      data(function (file) { 
        return { 
          require: 
            function(arg) { return JSON.parse(fs.readFileSync( arg)) },
          loadStyle:
            function(arg, globalVar) {
              console.log(path.dirname(arg)) // how to resolve relative paths to where the function was called?
              return (
                originalStylus(fs.readFileSync( arg, "utf8" ))
                .define('external', globalVar) //IDEA rewrite to iteration over an obj with muiltiple define(kegy, value)
                .render()
              )
            }
        } 
      })
    )
    .pipe(pug())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
}

function css() {
  return gulp.src('src/styles/*.styl')
    .pipe(stylus())
//    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function favicon() {
  return gulp.src('favicon.ico')
  .pipe(gulp.dest('./dist'))
}

function img() {
  return gulp.src('img/*.*')
    .pipe(gulp.dest('dist/img'))
}
 
function clean () {
  return del([ 'dist/**/*.*' ]);
}

function fonts(){
  return gulp.src('fonts/*.*')
    .pipe(gulp.dest('dist/fonts'))
}


const build = gulp.series(clean, gulp.parallel(html, css, img, fonts, favicon));
gulp.task('build', build);

const deploy = gulp.series(build, function () {
  return gulp.src("./dist/**/*")
    .pipe(gulpDeploy())
});

gulp.task('deploy', deploy)

const browser = function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
};

const serve = gulp.series(build, function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/**/*.styl", css);
    gulp.watch(["src/**/*.pug", "src/**/*.styl"], html)
    gulp.watch(["src/**/*.json"], html)
    gulp.watch("dist/**/*.*").on('change', browserSync.reload);
});

gulp.task('default', serve);
