/**
 *  code-split：
 *    - 可以将node_modules中代码单独打包一个chunk最终输出
 *    - 自动分析多入口chunk中，是否有公共的文件，如果有会打包成单独一个chunk
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
