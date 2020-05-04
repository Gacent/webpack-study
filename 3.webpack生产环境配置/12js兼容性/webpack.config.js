/**
 * js兼容性处理：babel-loader
 * 安装:@babel/preset-env babel-loader @babel/core
 * 1. 基本js兼容性处理--> @babel/preset-env 问题：只能转换基本语法，promise高级语法等不能转换
 * 2. 全部js兼容性处理--> @babel/polyfill  问题：只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大
 * 3. 按需处理加载-->  core-js 需要禁了第二个方案
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做哪些兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定corejs版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}
