import gulp from 'gulp'
import shell from 'gulp-shell'

gulp.task('demo:test', [], function () {
  return gulp.src('test/demo-test.js')
    .pipe(shell('phantomjs <%= (file.path) %>'))
})
