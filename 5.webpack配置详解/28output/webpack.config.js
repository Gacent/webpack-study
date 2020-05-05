/**
 *
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称，可以加指定目录
    filename: 'js/[name].js',
    // 输出的文件目录(所有资源输出的公共目录)
    path: resolve(__dirname, 'dist'),
    // 所有资源引入公共路径前缀 -> 'img/a.jpg'-->'/imgs/a.jpg'
    publicPath: './',
    // 非入口chunk的名称,（import 方式异步引入的文件，和splitchunk的时候），不改都会走filename
    chunkFilename: 'js/[name]_chunk.js',
    // 整个库向外暴露的变量名
    library: '[name]',
    // 变量名添加到哪个上
    // libraryTarget: 'window', // browser
    // libraryTarget: 'global', // node
    libraryTarget: 'window'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}
