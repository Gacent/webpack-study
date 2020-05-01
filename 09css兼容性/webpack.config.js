/**
  * css兼容性：postcss->postcss-loader postcss-preset-env(插件，识别环境加载特定配置)
  * 帮助postcss找到package.json中browserslist里面的配置，通过配置加载特定的css兼容性样式
  * "browserslist":{
     "development":[ // 开发环境
       "last 1 chrome version",
       "last 1 firefox version",
       "last 1 safari version"
     ],
     "production":[  // 生产环境：默认是看生产环境，和mode没关系，需要设置node环境变量，通过process.env.NODE_ENV='development'
       ">0.2%",
       "not dead", // 不要死的浏览器如IE10以下
       "not op_mini all"
     ]
   }
*/
// 使用：
// 1. 使用loader的默认配置
// 直接'postcss-loader',
// 2. 修改loader的配置
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 设置nodejs环境变量
process.env.NODE_ENV = 'development'
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',  // 标识，自由命名，只要是唯一的
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/build.css'
    })
  ],
  mode: 'development'
}