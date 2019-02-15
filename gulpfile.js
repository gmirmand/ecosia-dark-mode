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
sass.compiler = require('node-sass');

function style() {
    return (
        gulp
            .src('./sass/**/*.scss')
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

function javascriptVendors(){
    return gulp
        .src('./js/vendors/**/*.js')
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
}

function javascriptApp(){
    return gulp
        .src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
}

function watch(){
    gulp.watch('./sass/**/*.scss', style);
    gulp.watch('./js/**/*.js', javascriptVendors);
    gulp.watch('./js/**/*.js', javascriptApp);
}

exports.style = style;
exports.javascriptAppVendors = javascriptVendors;
exports.javascriptApp = javascriptApp;
exports.watch = watch;