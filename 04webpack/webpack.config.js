var webpack = require('webpack');
var autoprefixer = require('autoprefixer');//自动修补css浏览器前缀
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
module.exports = {
    devtool: 'eval-source-map',//生成source map以追踪js错误
    entry: __dirname + "/src/index.js",//js入口
    output: {
        path: __dirname + "/src/Server",//输出路径
        filename: "bundle.js"//输出名
    },

    module: {
      loaders:[
          {
              test:/\.js$/,//js loader
              exclude:/node_modules/,
              loader:'babel'//更多配置在.babelrc
          },
          {
              test:/\.css$/,//css loader
              loader:'style!css?!postcss'
              // loader:'style!css?modules!postcss'//css模块化
          },
          {
              test:/\.less$/,//css loader
              loader:'style!css?!less!postcss'//css模块化
          },
      ]
    },

    devServer: {//webpack-dev-server 配置
        contentBase: "./src/Server",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true,//热更新
        proxy: {
            '/*/*': {
                // path: '/*/*', //必须得有一个文件地址，如果顶层文件夹名字不同，则用/*代替
                target: 'http://m.hehenian.com',
                host: 'm.hehenian.com',
                secure: false,
                changeOrigin:true
            }
        }
    },
    postcss: [
        autoprefixer({ browsers: ['last 10 versions'] })//postcss 插件
    ],

    plugins: [
        new webpack.DefinePlugin({
            //process.argv：当前进程的命令行参数数组。
            //process.env：指向当前shell的环境变量，比如process.env.HOME。
            'process.env': {
                NODE_ENV: JSON.stringify('development') //定义编译环境
            }
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: '../index.html', //生成的html存放路径，相对于 path
            template: './src/Server/index.html', //html模板路径
            hash: false,
        }),
        new webpack.BannerPlugin('Copyright Chvin'),//添加 js头
        new webpack.HotModuleReplacementPlugin(),//热更新
        new webpack.NoErrorsPlugin(),

    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    },
}