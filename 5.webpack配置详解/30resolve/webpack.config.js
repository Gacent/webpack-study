/**
 *
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js /index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'dist')
  },
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名：
    // 优点：简写路径
    // 缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.css'],
    // 告诉webpack解析模块是去哪个目录找，后面的node_modules是防止找不到
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}
