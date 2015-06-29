var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var jade = require('gulp-jade');
var sass = require('gulp-sass');

var paths = {
    javascript: './src/javascript/**/*.js',
    app: './src/javascript/main.js',
    templates: './src/templates/**/*.jade',
    stylesheets: './src/stylesheets/**/*.sass'
};


gulp.task('templates', function() {
  gulp.src(paths.templates)
    .pipe(jade())
    .pipe(gulp.dest('./dist/'));
});


gulp.task('javascript', function() {
    browserify({ entries: paths.app, debug: true })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});


gulp.task('sass', function () {
  gulp.src(paths.stylesheets)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('watch', function() {
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.javascript, ['javascript']);
    gulp.watch(paths.stylesheets, ['stylesheets']);
});


gulp.task('default', ['javascript', 'templates', 'sass', 'watch']);
