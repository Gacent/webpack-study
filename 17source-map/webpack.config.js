/*
  source-map:一种提供源代码到构建后代码映射 技术  （如果构建后代码错了，通过映射可以追踪源代码错误）
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map:外部
      - 错误代码准确信息和源代码的错误位置

    inline-source-map：内联，打到js中，只生成一个内联source-map
      - 错误代码准确信息和源代码的错误位置

    hidden-source-map：外部
      - 错误代码错误原因，但是没有错误位置，不能追踪到源代码的错误，只能提示到构建后代码的位置

    eval-source-map：内联，每个文件都生成对应的source-map 都在eval
      - 错误代码准确信息和源代码的错误位置，文件有哈希值

    nosources-source-map：外部
      - 错误代码准确信息，但是没有任何源代码信息
    cheap-source-map：外部
      - 错误代码准确信息和源代码的错误位置
      - 只能精确到行，列信息没有

    cheap-module-source-map：外部
      - 错误代码准确信息和源代码的错误位置
      - module会将loader的source map加入

    内联和外部区别：1. 外部生产了文件，内联没有；2. 内联构建速度快

    开发环境：速度快，调试更友好
      速度快（eval>inline>cheap...）
        cheap-eval-source-map
        eval-source-map
      调试更友好：
        source-map
        cheap-module-source-map
        cheap-source-map
      --> eval-source-map/cheap-module-eval-source-map

    生产环境：源代码要不要隐藏？调试要不要更友好
      // 内联在生产环境下都排除
        nosources-source-map  全部隐藏
        hidden-source-map 只隐藏源代码，会提示构建后代码错误

      --> source-map/cheap-module-source-map/
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
  },
  devtool: 'eval-source-map'
}
