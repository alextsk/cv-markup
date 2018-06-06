var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
//var minifyCSS = require('gulp-csso');
//var concat = require('gulp-concat');
//var sourcemaps = require('gulp-sourcemaps');
var gulpDeploy      = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();
var del = require('del');

function html() {
  return gulp.src('src/*.pug')
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


const build = gulp.series(clean, gulp.parallel(html, css, img, fonts));
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
    gulp.watch("src/**.pug", html)
    gulp.watch("dist/**/*.*").on('change', browserSync.reload);
});

gulp.task('default', serve);
