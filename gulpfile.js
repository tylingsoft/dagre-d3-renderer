import path from 'path'
import changed from 'gulp-changed'
import gulp from 'gulp'
import { KarmaServer } from 'karma'
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
  const server = new KarmaServer({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: false,
    browsers: ['PhantomJS']
  })
  server.start()
  cb()
})

gulp.task('build', ['demo:build', 'js:test', 'demo:test'])

gulp.task('watch', ['demo:watch', 'js:test:watch'])

gulp.task('dist', ['build'], function () {
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

  const server = new KarmaServer(args, cb)
  server.start()
}
