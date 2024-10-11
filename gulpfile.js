const gulp = require('gulp')
const del = require('del')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')
const swig = require('gulp-swig')
const data = require('gulp-data')
const fs = require('fs-extra')

const browserSync = require('browser-sync').create()

function copyAsset() {
  return gulp.src(['src/assets/**/*', '!src/assets/data/data.json']).pipe(gulp.dest('./dist/assets'))
}

function cleanSource() {
  return del(['dist/**', '!dist'])
}

//compile scss into css
function style() {
  return (
    gulp
      .src('src/stylesheets/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/assets/css'))
      .pipe(browserSync.stream())
  )
}

//compile jade into html
function html() {
  return gulp
    .src([
      'src/templates/**/*.pug',
      '!src/templates/layouts/*.pug',
      '!src/templates/partials/*.pug',
      '!src/templates/mixins/*.pug',
    ])
    .pipe(
      data(function (file) {
        return JSON.parse(fs.readFileSync('./src/assets/data/data.json', 'utf-8'))
      }),
    )
    .pipe(
      pug({
        doctype: 'html',
        pretty: true,
      }),
    )
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    port: 4000,
  })
  gulp.watch('src/assets/**/*', copyAsset).on('change', browserSync.reload)
  gulp.watch('src/stylesheets/**/*.scss', style).on('change', browserSync.reload)
  gulp.watch('src/templates/**/*.pug', html).on('change', browserSync.reload)
}

// define complex tasks
const build = gulp.series(cleanSource, style, html, copyAsset, watch)

// export tasks
exports.cleanSource = cleanSource
exports.style = style
exports.html = html
exports.build = build
exports.watch = watch
exports.default = build
