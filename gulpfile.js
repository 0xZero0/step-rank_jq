var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var src_js = './js',
    dest_js = './dest/js';

gulp.task('minjs', function () {
  gulp.src(src_js+'/*.js')
      .pipe(uglify())//压缩
      .pipe(concat("all.min.js"))//合并
      .pipe(gulp.dest(dest_js));
});

// gulp.task('watch', function () {
//   gulp.watch(src_js+'/**/*.js',['minjs']);//监听src/css/下的全部.js文件，若有改动则执行名为'minjs'任务
// });

gulp.task('default',['minjs','watch']);