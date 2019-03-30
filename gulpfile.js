'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
sass.compiler = require('node-sass');

function styleMain() {
    return (
        gulp
            .src('sass/main/**/*.scss')
            .pipe(sassGlob())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(sourcemaps.init())
            .pipe(cleanCSS())
            .pipe(sourcemaps.write())
            .on("error", sass.logError)
            .pipe(gulp.dest('./'))
    );
}

function stylePopup() {
    return (
        gulp
            .src('sass/popup/**/*.scss')
            .pipe(sassGlob())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(sourcemaps.init())
            .pipe(cleanCSS())
            .pipe(sourcemaps.write())
            .on("error", sass.logError)
            .pipe(gulp.dest('./'))
    );
}

function javascriptVendors() {
    return gulp
        .src('./js/vendors/**/*.js')
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
}

function javascriptMain() {
    return gulp
        .src('./js/main/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
}

function javascriptPopup() {
    return gulp
        .src('./js/popup/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat('popup.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
}

function watch() {
    gulp.watch('./sass/global/**/*.scss', gulp.parallel(stylePopup, styleMain));
    gulp.watch('./sass/popup/**/*.scss', stylePopup);
    gulp.watch('./sass/main/**/*.scss', styleMain);
    gulp.watch('./js/**/*.js', javascriptVendors);
    gulp.watch('./js/**/*.js', javascriptPopup);
    gulp.watch('./js/**/*.js', javascriptMain);
}

async function compile() {
    gulp.src(['./assets/**','ecosia-dark-mode.html','global.css','main.css','main.js','manifest.json','popup.css','popup.js','vendors.js'])
        .pipe(zip('ecosia-dark-mode.zip'))
        .pipe(gulp.dest('./'))
}

exports.styleMain = styleMain;
exports.stylePopup = stylePopup;
exports.javascriptVendors = javascriptVendors;
exports.javascriptPopup = javascriptVendors;
exports.javascriptMain = javascriptMain;
exports.watch = watch;
exports.compile = compile;