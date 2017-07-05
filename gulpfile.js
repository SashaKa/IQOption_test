const gulp = require('gulp');
const gutil = require('gulp-util');
const plugins = require('gulp-load-plugins')();

gulp.task('default', () => {
  gulp.watch('src/less/*.less', ['build-css-from-less']);
  gulp.watch('build/*.html', ['validate-html']);
});

gulp.task('build-css-from-less', () => {
  return gulp
    .src('src/less/*.less')
    .pipe(plugins.plumber())
    .pipe(plugins.less())
    .on('error', (e) => {
      gutil.log(e);
      this.emit('end');
    })
    .pipe(
      plugins.autoprefixer({
        browsers: [
          'last 2 versions',
          'IE 10',
          'IE 11'
        ],
        cascade: false
      })
    )
    .pipe(gulp.dest('build/css'))
    .on('error', gutil.log);
});

gulp.task('validate-html', () => {
  return gulp.src("build/*.html")
    .pipe(plugins.htmlhint())
    .pipe(plugins.htmlhint.reporter())
})