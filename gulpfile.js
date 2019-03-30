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

var fs = require('fs');
var packageInfos = JSON.parse(fs.readFileSync('./package.json'));

var paths = {
    sass: {
        src: {
            main: 'sass/main/**/*.scss',
            popup: 'sass/popup/**/*.scss',
        },
        watch: {
            global: './sass/global/**/*.scss',
            popup: './sass/popup/**/*.scss',
            main: './sass/main/**/*.scss',
        }
    },
    js: {
        src: {
            vendors: './js/vendors/**/*.js',
            main: './js/main/*.js',
            popup: './js/popup/*.js',
        },
        watch: {
            main: './js/main/*.js',
            popup: './js/popup/*.js',
        }
    },
    dest: {
        main: './dist/',
        compile: './compile/'
    }
};

function styleMain() {
    return (
        gulp
            .src(paths.sass.src.main)
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
            .pipe(gulp.dest(paths.dest.main))
    );
}

function stylePopup() {
    return (
        gulp
            .src(paths.sass.src.popup)
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
            .pipe(gulp.dest(paths.dest.main))
    );
}

function javascriptVendors() {
    return gulp
        .src(paths.js.src.vendors)
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest.main));
}

function javascriptMain() {
    return gulp
        .src(paths.js.src.main)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest.main));
}

function javascriptPopup() {
    return gulp
        .src(paths.js.src.popup)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat('popup.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest.main));
}

function watch() {
    gulp.watch(paths.sass.watch.global, gulp.parallel(stylePopup, styleMain));
    gulp.watch(paths.sass.watch.popup, stylePopup);
    gulp.watch(paths.sass.watch.main, styleMain);
    gulp.watch([paths.js.watch.main, paths.js.watch.popup], javascriptVendors);
    gulp.watch(paths.js.watch.main, javascriptMain);
    gulp.watch(paths.js.watch.popup, javascriptPopup);
}

gulp.task('default', gulp.series(stylePopup, styleMain, javascriptVendors, javascriptMain, javascriptPopup));

async function compile() {
    gulp.src([
        paths.dest.main + '/**'
    ])
        .pipe(zip(packageInfos.name + '-' + new Date().getTime() + '-v' + packageInfos.version.replace(/\./g,'') + '.zip'))
        .pipe(gulp.dest(paths.dest.compile))
}

exports.styleMain = styleMain;
exports.stylePopup = stylePopup;
exports.javascriptVendors = javascriptVendors;
exports.javascriptPopup = javascriptVendors;
exports.javascriptMain = javascriptMain;
exports.watch = watch;
exports.compile = compile;