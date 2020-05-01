/*
  HMR：hot module replacement 热模块替换
    作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
      极大提升构建速度

      样式文件：可以使用HMR功能因为style-loader内部实现了，所以我们开发环境会使用style-loader，而生产会替换成miniextractcss
      js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对js的处理，只能处理非入口js文件的其他文件
      html文件：默认不能使用HMR功能，同时会导致问题：html不能热更新了，（不用做HMR功能）
        解决：修改entry入口，将HTML文件引入
*/
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: ['./src/index.js', './src/index.html'],
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build')
  }, /*  */
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而被url-loader进行处理）
        loader: 'html-loader'
      },
      {
        // 问题：默认处理不了html中的img
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader
        // 下载url-loader   file-loader
        loader: 'url-loader',
        options: {
          // 图片小于8kb，就会被base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会非常大（文件请求速度更慢）
          limit: 15 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，解析时会出问题[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          // 给图片进行重命名
          // 取hash值前十位，同时取文件原来扩展名
          name: '[hash:10].[ext]',
          outputPath: 'imgs'
        }
      },
      // 打包其他资源（除了html/css/js资源以外的资源）
      {
        // 排除
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    // 构建后路径目录
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true
  }
}
