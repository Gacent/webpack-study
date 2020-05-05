/**
 *
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // loader
      {
        test: /\.css$/,
        // 多个loader使用use
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        // 单个loader用loader
        // 排除文件
        exclude: /node_modules/,
        // 指定检查目录
        include: resolve(__dirname, 'src'),
        // 优先执行
        enforce: 'pre',
        // 延后执行，不写就是中间执行
        // enforce: 'post',
        loader: 'eslint-loader',
        options: {}
      },
      {
        // 一下配置只会生效一个
        oneof: []
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}
