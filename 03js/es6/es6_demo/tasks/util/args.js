import yargs from 'yargs';

//引入 yargs 来做一些项目的配置
const args = yargs

    //生产环境
  .option('production',{
    boolean:true,
    default:false,
    describe:'min all scripts'
  })
  // watch
  .option('watch',{
    boolean:true,
    default:false,
    describe:'watch all files'
  })
 // 打日志
  .option('verbose',{
    boolean:true,
    default:false,
    describe:'log'
  })
// sourcemap
  .option('sourcemaps',{
    describe:'force the creation of sroucemaps'
  })
//服务器端口
  .option('port',{
    string:true,
    default:8080,
    describe:'server port'
  })
 // 表示输出的命令行以字符串解析
  .argv

export default args;
