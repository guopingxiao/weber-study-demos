var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        './app/main.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.css$/,//添加对样式表的处理,感叹号的作用在于使同一文件能够使用不同类型的loader
                loader: 'style!css?modules!postcss'//加上了?modules,是的css能够模块化,使用PostCSS来为CSS代码自动添加适应不同浏览器的CSS前缀。
            },
            {
                test: /\.json$/,//在配置文件里添加JSON loader
                loader: 'json'
            },
        ]
    }
};
