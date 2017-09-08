import gulp from 'gulp'
import replace from 'gulp-replace'
import shell from 'gulp-shell'

const BUILD_DIST_DIR = 'build/dist'
const DIST_DIR = 'dist'
const DEMO_SRC = 'demo/**/*'
const DEMO_BUILD = BUILD_DIST_DIR + '/demo'

gulp.task('demo:build', function () {
  return gulp.src(DEMO_SRC)
    .pipe(replace('../' + BUILD_DIST_DIR + '/dagre-d3.js', '../dagre-d3.js'))
    .pipe(gulp.dest(DEMO_BUILD))
})

gulp.task('demo:test', ['demo:build'], function () {
  return gulp.src('test/demo-test.js')
    .pipe(shell('phantomjs <%= (file.path) %>'))
})

gulp.task('build', ['demo:build', 'demo:test'])

gulp.task('dist', ['build'], function () {
  return gulp.src(BUILD_DIST_DIR + '/**/*')
    .pipe(gulp.dest(DIST_DIR))
})
