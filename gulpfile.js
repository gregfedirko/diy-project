var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function() {
  return gulp.src('public/css/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('public/css'));
});


gulp.task('watch-stylus', function() {
  gulp.watch('public/css/*.styl', ['stylus']);
});

gulp.task('default', ['watch-stylus']);

