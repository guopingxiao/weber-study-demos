import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

//创建构建命令，用gulp-sequence来保证构建任务的顺序问题，server一定放在最后
gulp.task('build',gulpSequence('clean','css','pages','scripts',['browser','serve']));
