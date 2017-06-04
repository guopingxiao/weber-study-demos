import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args';
/*
* gulp-live-server：启动一个脚本作为服务器
* */
//配置服务器task
gulp.task('serve',(cb)=>{
  if(!args.watch) return cb();// 如果不是监听状态下，直接返回回调函数
 //创建一个服务器，启动server/bin/www
  var server = liveserver.new(['--harmony','server/bin/www']);
  server.start();
 // 监听server下js和ejs发生变化，并通知服务器刷新浏览器
  gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'],function(file){
    server.notify.apply(server,[file]);
  })
// 监听server下的一些路由接口发生改变，入口变化则要重启服务器
  gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
    server.start.bind(server)()
  });
})
