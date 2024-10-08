const gulp = require('gulp')
const del = require('del')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')
const browserSync = require('browser-sync').create()

function copyAsset() {
  return gulp.src(['src/assets/**/*']).pipe(gulp.dest('./dist/assets'))
}

function cleanSource() {
  return del(['dist/**', '!dist'])
}

//compile scss into css
function style() {
  return gulp
    .src('src/stylesheets/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream())
}

//compile jade into html
function html() {
  return gulp
    .src([
      'src/templates/**/*.pug',
      '!src/templates/_layouts/*.pug',
      '!src/templates/_partials/*.pug',
      '!src/templates/_mixins/*.pug',
    ])
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
  gulp.watch('src/scss/**/*.scss', style).on('change', browserSync.reload)
  gulp.watch('src/pug/**/*.pug', html).on('change', browserSync.reload)
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
