import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import args from './util/args';

// 配置浏览器，分别配置不同文件，执行不同gulp命令
gulp.task('browser',(cb)=>{
  if(!args.watch) return cb();
  gulp.watch('app/**/*.js',['scripts']);
  gulp.watch('app/**/*.ejs',['pages']);
  gulp.watch('app/**/*.css',['css']);
});
