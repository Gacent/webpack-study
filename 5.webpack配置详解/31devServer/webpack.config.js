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
  resolve: {
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    extensions: ['.js', '.css'],
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
  devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监视contentBase文件目录，一旦文件变化就会reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: 'localhost',
    open: true,
    hot: true,
    // 日志信息是否启用
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容不要显示
    quiet: true,
    // 如果出现错误，不要全屏提示
    overlay: false,
    // 服务器代理-->解决开发环境跨域问题
    proxy: {
      // 一旦devServer（5000）服务器接收到/api/xx请求，就会把请求转发到另外一个服务器（3000）
      // 浏览器和服务器之间会有跨域问题，服务器之间没有跨域问题。代码是通过代理服务器进行的
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时候，请求路径重写，将/api/xx-->/xxx
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  mode: 'development'
}
