/**
 *
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'dist'),
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js'
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
  optimization: {
    splitChunks: {
      chunks: 'all'
      // 以下都是默认值
      // // 分割的chunk大小最小为30kb
      // minSize: 30 * 1024,
      // // 最大没有限制
      // maxSize: 0,
      // // 要提取的chunks最少要被引用1次
      // minChunks: 1,
      // // 按需加载时，并行加载的文件的最大数量
      // maxAsyncRequests: 5,
      // // 入口js文件最大并行请求数量
      // maxInitialRequests: 3,
      // // 名称连接符号
      // automaticNameDelimiter: '~',
      // // 可以使用命名规则
      // name: true,
      // cacheGroups: { // 分割chunk的组
      //   verdors: {
      //     // node_modules文件会被打包到vendors组的chunk中 。-->vendors~xxx,js
      //     // 同时满足上面的公共规则
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     // 如果当前打包的模块，和之前已经被提取的模块是同一个，就会复用，而不会重新打包
      //     reuseExistingChunk: true
      //   }
      // }
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件runtime
    // 解决：修改a文件导致b文件的contenthash变化，解决缓存不了的BUG
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案:js和css，ugly那个不维护了
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动sourceMap
        sourceMap: true
      })
    ]
  },
  mode: 'production'
}
