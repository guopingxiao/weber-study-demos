import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

// 配置gulp处理css文件处理，围绕js,这里就不watch了
gulp.task('css',()=>{
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest('server/public'))
})
