const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function compileScss() {
  return gulp.src('./scss/main.scss')
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./scss/**/*.scss', compileScss);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js', browserSync.reload);
}
exports.compileScss = compileScss;
exports.watch = watch;
