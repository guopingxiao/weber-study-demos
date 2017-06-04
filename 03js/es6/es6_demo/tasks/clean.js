import gulp from 'gulp';
import del from 'del';
import args from './util/args';

//因为每次文件变化的时候，文件都从app目录拷贝要server目录，再进行一系列操作，
// 所以为了安全起见，建立一个清空文件的操作。
gulp.task('clean',()=>{
  return del(['server/public','server/views'])
})
