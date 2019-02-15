'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
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

function watch(){
    gulp.watch('./sass/**/*.scss', style)
}

exports.style = style;
exports.watch = watch;