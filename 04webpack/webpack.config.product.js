var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');//自动修补css浏览器前缀
var path = require('path');


//定义地址
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'index.js'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, 'build'); //发布文件所存放的目录



module.exports = {
    devtool: 'source-map',//生成source map以追踪js错误
    entry: {
        app: APP_FILE,
        common: [
            "react",
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'redux-thunk',
            // 'immutable',
            'react-router-transition'
        ]
    },
    output: {
        publicPath: 'http://static.hehenian.com/m/v6/dist/', 
        path: BUILD_PATH,
        filename: "[name].[hash:8].min.js",
        chunkFilename: '[name].[chunkhash:8].min.js',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer']),
                exclude: /^node_modules$/,
            },
             {
                test: /\.less$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'less'])
            }, {
                test: /\.scss$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'sass'])
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /^node_modules$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图
            }
        ]
    },
    postcss: [
        require('autoprefixer')
    ],

    plugins: [
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: './index.html', //生成的(build)html存放路径，相对于 path
            template: __dirname + "/src/Server/index.html",
            hash:false,
            inject: 'body',
        }),
        new ExtractTextPlugin("[name].[hash:8].css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production') //定义生产环境
            }
        }),
        //提取出来的样式和common.js会自动添加进发布模式的html文件中，原来的html没有
        new webpack.optimize.CommonsChunkPlugin("common", "common.bundle.js"),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    },

}