/*
  externals：拒绝第三方包打包成bundle，使用CDN方式
*/
const { resolve } = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
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
    })
  ],
  mode: 'production',
  externals: {
    // 忽略库名，后面是包名，不能写错
    jquery: 'jQuery'
  }
}
