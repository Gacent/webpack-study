/**
 *  缓存
 *    1. babel缓存
 *      使用cacheDirectory设置为true，对构建时候没有变化的模块使用缓存
 *      -> 让第二次打包构建速度更快
 *    2. 文件资源缓存
 *      hash:每次webpack打包时会生产一个唯一的hash值
 *        问题：因为js和css同时使用一个hash值
 *          如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
 *      chunkhash:根据chunk生产的hash值，如果打包来源于同一个chunk，那么hash值就一样
 *        问题：js和css的hash值还是一样的
 *          因为css是在js中被引进，所以同属于一个chunk；通过入口文件引进来的模块都同属于一个chunk
 *      contenthash：根据文件的内容生成hash值，不同文件的hash一定不一样
 *      --> 让代码上线运行缓存更好使用
 *
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
