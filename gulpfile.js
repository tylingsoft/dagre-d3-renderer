const path = require('path')
const _ = require('lodash')
const browserSync = require('browser-sync')
const changed = require('gulp-changed')
const del = require('del')
const fs = require('fs')
const gulp = require('gulp')
const karma = require('karma').server
const replace = require('gulp-replace')
const shell = require('gulp-shell')
const watch = require('gulp-watch')

const BUILD_DIR = 'build'
const BUILD_DIST_DIR = 'build/dist'
const DIST_DIR = 'dist'
const DEMO_SRC = 'demo/**/*'
const DEMO_BUILD = BUILD_DIST_DIR + '/demo'

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
  const pkg = readPackageJson()
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
  const args = {
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
  const template = fs.readFileSync(templateFile)
  const compiled = _.template(template)
  return compiled(props)
}

/**
 * Read the contents of package.json in as JSON. Do not cache package.json,
 * because it may have changed (e.g. when running in watch mode).
 */
function readPackageJson () {
  const packageText = fs.readFileSync('package.json')
  return JSON.parse(packageText)
}
