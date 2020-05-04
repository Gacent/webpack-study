/*
  add-asset-html-webpack-plugin

  dll作用：下次打包的时候不用再重复打包第三方包，直接从dll引进来
*/
const { resolve } = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const webpack = require('webpack')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [

    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      // 复制文件
      template: './src/index.html'
    }),
    // 告诉webpack哪些库不用打包，同时使用时的名称也变
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js')
    })
  ],
  mode: 'production'
}
