'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const dependents = require('gulp-dependents')
const sourcemaps = require('gulp-sourcemaps')

const cssRoot = 'src/site/static/css'
const scssRoot = 'src/scss'

const glob = {
    sass: [`${scssRoot}/*.scss`, `${scssRoot}/**/*.scss`]
}

function compileCSS (cb) {
    gulp.src(glob.sass, { since: gulp.lastRun(compileCSS) }) // filter only changed files
        .pipe(sourcemaps.init())
        .pipe(dependents()) // find sass files to re-compile
        .pipe(sass().on('error', sass.logError))
        // other plugins like autoprefixer and clean-css
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${cssRoot}`))
        .on('end', cb)
}

function watchCSS () {
    gulp.watch(glob.sass, compileCSS)
}
exports.css = compileCSS
exports.watch = watchCSS