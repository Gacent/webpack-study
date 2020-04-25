/*
  开发环境配置：能让代码运行起来
  输出的路径：css会打到js里面，所以不需要outputPath
*/
const {resolve} =require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
  entry:'./src/index.js',
  output:{
    filename:'js/build.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      {
        test:/\.html$/,
        // 处理html文件的img图片（负责引入img，从而被url-loader进行处理）
        loader:'html-loader'
      },
      {
        // 问题：默认处理不了html中的img
        // 处理图片资源
        test:/\.(jpg|png|gif)$/,
        // 使用一个loader
        // 下载url-loader   file-loader
        loader:'url-loader',
        options:{
          // 图片小于8kb，就会被base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会非常大（文件请求速度更慢）
          limit:15*1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，解析时会出问题[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule:false,
          // 给图片进行重命名
          // 取hash值前十位，同时取文件原来扩展名
          name:'[hash:10].[ext]',
          outputPath:'imgs'
        }
      },
      // 打包其他资源（除了html/css/js资源以外的资源）
      {
        // 排除
        exclude:/\.(css|js|html)$/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]',
          outputPath:'media'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development',
  devServer:{
    // 构建后路径目录
    contentBase:resolve(__dirname,'build'),
    // 启动gzip压缩
    compress:true,
    // 端口号
    port:3000,
    // 自动打开浏览器
    open:true
  }
}