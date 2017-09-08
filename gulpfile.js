import path from 'path'
import _ from 'lodash'
import browserSync from 'browser-sync'
import changed from 'gulp-changed'
import fs from 'fs'
import gulp from 'gulp'
import { Server } from 'karma'
import replace from 'gulp-replace'
import shell from 'gulp-shell'
import watch from 'gulp-watch'

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
  const server = new Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: false,
    browsers: ['PhantomJS']
  })
  server.start()
  cb()
})

gulp.task('version:build', function () {
  const pkg = readPackageJson()
  fs.writeFileSync('lib/version.js', generateVersionJs(pkg))
})

gulp.task('build', ['demo:build', 'js:test', 'demo:test'])

gulp.task('watch', ['demo:watch', 'js:test:watch'])

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

gulp.task('default', ['build'])

function karmaSingleRun (conf, cb) {
  const args = {
    configFile: conf,
    singleRun: true
  }

  if (process.env.BROWSERS) {
    args.browsers = process.env.BROWSERS.split(',')
  }

  const server = new Server(args, cb)
  server.start()
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
