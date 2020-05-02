/**
 *  code-split：(针对单页面)
 *    - 可以将node_modules中代码单独打包一个chunk最终输出
 *    - 通过js代码，让某个文件被单独打包成一个chunk，import动态导入语法，能将某个文件单独打包
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 决定browserlist使用哪个环境
process.env.NODE_ENV = 'production'

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production'
}
