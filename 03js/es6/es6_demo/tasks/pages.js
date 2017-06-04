import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

// 配置gulp处理页面的配置
gulp.task('pages',()=>{
  return gulp.src('app/**/*.ejs')//app下所有的.ejs文件
    .pipe(gulp.dest('server'))
    .pipe(gulpif(args.watch,livereload()))
})
