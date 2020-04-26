/**
 * optimize-css-assets-webpack-plugin
 * 压缩css：css文件变小，请求速度更快，用户打开页面也更快
 */
const {resolve} = require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin')
// 设置nodejs环境变量
// process.env.NODE_ENV='development'
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              ident:'postcss',
              plugins:()=>[
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename:'css/build.css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode:'development'
}