const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js', // 入口文件
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    resolve: { // 改变模块查找方式，先到source目录下查找，再到node_module下查找
        modules: [path.resolve(__dirname, 'source'), path.resolve('node_modules')]
    },
    plugins: [
        new HtmlWebpackPlugin({
            templat: path.join(__dirname,'./public/index.html'),
            filename: 'index.html',
        })
    ]
} 