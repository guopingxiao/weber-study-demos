import gulp from 'gulp';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';
import livereload from 'gulp-livereload';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import {log,colors} from 'gulp-util';
import args from './util/args';

/*配置脚本*：
gulp-if： gulp中条件判断的
 gulp-concat：文件拼接
 webpack-stream：处理文件流
 gulp-plumber：管道拼接
 vinyl-named：重命名
 gulp-livereload： 热更新
 args：命令行解析的包
 */

// 配置gulp处理js脚本的命令
gulp.task('scripts',()=>{ //文件打开执行
  return gulp.src(['app/js/index.js'])
    .pipe(plumber({ //捕获错误
      errorHandle:function(){

      }
    }))
    .pipe(named()) //文件重命名
    .pipe(gulpWebpack({ //配置webpack
      module:{
        loaders:[{
          test:/\.js$/,
          loader:'babel'
        }]
      }
    }),null,(err,stats)=>{ //处理错误
      log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
        chunks:false
      }))
    })
    .pipe(gulp.dest('server/public/js'))//文件输出，放在服务器端
    .pipe(rename({ //保留一份源码未压缩的
      basename:'cp',
      extname:'.min.js'
    }))
    .pipe(uglify({compress:{properties:false},output:{'quote_keys':true}})) //压缩混淆
    .pipe(gulp.dest('server/public/js')) //再输出，已经压缩的
    .pipe(gulpif(args.watch,livereload()))//判断是否有更新，有watch则热更新；
})
