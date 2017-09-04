'use strict'

const path = require('path')

var _ = require('lodash')
var browserSync = require('browser-sync')
var changed = require('gulp-changed')
var del = require('del')
var fs = require('fs')
var gulp = require('gulp')
var karma = require('karma').server
var replace = require('gulp-replace')
var shell = require('gulp-shell')
var watch = require('gulp-watch')

var BUILD_DIR = 'build'
var BUILD_DIST_DIR = 'build/dist'
var DIST_DIR = 'dist'
var DEMO_SRC = 'demo/**/*'
var DEMO_BUILD = BUILD_DIST_DIR + '/demo'

gulp.task('demo:build', function () {
  return gulp.src(DEMO_SRC)
        .pipe(replace('../' + BUILD_DIST_DIR + '/dagre-d3.js', '../dagre-d3.js'))
        .pipe(gulp.dest(DEMO_BUILD))
})

gulp.task('demo:watch', ['demo:build'], function () {
  gulp.src(DEMO_SRC)
        .pipe(watch(DEMO_SRC), { verbose: true })
        .pipe(changed(DEMO_BUILD))
        .pipe(replace('../' + BUILD_DIST_DIR + '/dagre-d3.js', '../dagre-d3.js'))
        .pipe(gulp.dest(DEMO_BUILD))
})

gulp.task('demo:test', ['demo:build'], function () {
  return gulp.src('test/demo-test.js')
        .pipe(shell('phantomjs <%= (file.path) %>'))
})

gulp.task('js:test', [], function (cb) {
  karmaSingleRun(path.join(__dirname, 'karma.conf.js'), cb)
})

gulp.task('js:test:watch', [], function (cb) {
  karma.start({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: false,
    browsers: ['PhantomJS']
  })
  cb()
})

gulp.task('core-js:test', [], function (cb) {
  karmaSingleRun(path.join(__dirname, 'karma.core.conf.js'), cb)
})

gulp.task('version:build', function () {
  var pkg = readPackageJson()
  fs.writeFileSync('lib/version.js', generateVersionJs(pkg))
})

gulp.task('build', ['demo:build', 'js:test', 'core-js:test', 'demo:test'])

gulp.task('watch', ['demo:watch', 'js:watch', 'js:test:watch'])

gulp.task('serve', ['watch'], function () {
  browserSync.init({
    files: BUILD_DIST_DIR + '/**/*',
    notify: false,
    open: false,
    reloadOnRestart: true,
    server: {
      baseDir: BUILD_DIST_DIR,
      directory: true
    }
  })
})

gulp.task('dist', ['version:build', 'build'], function () {
  return gulp.src(BUILD_DIST_DIR + '/**/*')
        .pipe(gulp.dest(DIST_DIR))
})

gulp.task('release', ['dist'], function () {
  return gulp.src('src/release/release.sh')
        .pipe(shell('<%= (file.path) %>'))
})

gulp.task('clean', function (cb) {
  del(BUILD_DIR, cb)
})

gulp.task('default', ['build'])

function karmaSingleRun (conf, cb) {
  var args = {
    configFile: conf,
    singleRun: true
  }

  if (process.env.BROWSERS) {
    args.browsers = process.env.BROWSERS.split(',')
  }

  karma.start(args, cb)
}

function generateVersionJs (pkg) {
  return applyTemplate('src/version.js.tmpl', { pkg: pkg })
}

function applyTemplate (templateFile, props) {
  var template = fs.readFileSync(templateFile)
  var compiled = _.template(template)
  return compiled(props)
}

/**
 * Read the contents of package.json in as JSON. Do not cache package.json,
 * because it may have changed (e.g. when running in watch mode).
 */
function readPackageJson () {
  var packageText = fs.readFileSync('package.json')
  return JSON.parse(packageText)
}
