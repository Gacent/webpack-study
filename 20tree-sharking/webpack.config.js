/**
 *  tree-shaking：去除无用代码
 *    前提：1.必须使用ES6模块化；2.开启production环境
 *    作用：减少代码体积
 *
 *    在package.json中配置
 *      "sideEffects":false  所有代码都没有副作用，都可以进行tree-shaking(可以安全地删除未用到的 export 导出)
 *        副作用的代码：存在一些不是通过export方式的代码，且不能shake的代码
 *        问题:可能会把css/ @babel/polyfill (副作用)文件干掉
 *        "sideEffects":["*.css","*.less"]
 */
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 决定browserlist使用哪个环境
process.env.NODE_ENV = 'production'
// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader', // 使用默认配置则直接写字符串形式，如果要覆盖默认则使用对象形式
  {
    loader: 'postcss-loader', // 还要在package.json中设置browserlist选项
    options: {
      ident: 'postcss',
      plugins: () => {
        require('postcss-preset-env')()
      }
    }
  }
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.[contenthash:10].js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader']
          },
          /**
           * 正常来讲，一个文件只能被一个loader处理
           * 当一个文件要多个loader处理，那么一定要制定loader执行的先后顺序，
           * 先执行eslint 再执行babel
           * */
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
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
              ],
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true
            }
          },
          {
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
              esModule: false
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)/,
            loader: 'file-loader',
            options: {
              outputPath: 'media'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/build.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  devtool: 'source-map',
  mode: 'production'
}
