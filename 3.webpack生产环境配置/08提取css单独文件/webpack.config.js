/**
 * mini-css-extract-plugin
 * 提取css到文件中
 * 优点：
 * 1. 没有闪屏现象了
 * 2. css和html分割开来了
 * 3. 加载更快
 * 4. 体积更小
 */
const {resolve} = require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
module.exports={
  entry:'./src/js/index.js',
  output:{
    filename:'js/build.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          // 创建style标签，将样式放入
          // 'style-loader',
          // 这个loader取代style-loader，作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader'
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 对输出的文件重命名
      filename:'css/build.css'
    })
  ],
  mode:'development'
}