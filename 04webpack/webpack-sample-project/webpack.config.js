var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/app/main.js',//已多次提及的唯一入口文件
    output: {
        path: __dirname + '/public',//打包后的文件存放的地方
        filename: 'bundle.js'//打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        colors: true,   //终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    moudule: {
        loaders: [
            {
                test: /\.json$/,//在配置文件里添加JSON loader
                loader: 'json'
            },
            { test: /\.js?$/, exclude: /(node_modules)/, loader: 'babel-loader' },
            {
                test: /\.css$/,//添加对样式表的处理,感叹号的作用在于使同一文件能够使用不同类型的loader
                loader: 'style!css?modules!postcss'//加上了?modules,是的css能够模块化,使用PostCSS来为CSS代码自动添加适应不同浏览器的CSS前缀。
            }
        ],
        postcss: [
            require('autoprefixer')//调用autoprefixer插件
        ],

        //loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，plugins并不直接操作单个文件，它直接对整个构建过程其作用。
        //要使用某个插件，我们需要通过npm安装它，然后要做的就是在webpack配置中的plugins关键字部分添加该插件的一个实例
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
            })
        ],
    }
}