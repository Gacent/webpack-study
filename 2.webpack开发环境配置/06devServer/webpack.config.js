/*
  开发服务器devServer：
  作用：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  特点：只会在内存中编译打包，不会有任何输出
  启动指令：webpack-dev-server
*/ 
const {resolve} =require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
  entry:'./src/index.js',
  output:{
    filename:'build.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      // 打包其他资源（除了html/css/js资源以外的资源）
      {
        // 排除
        exclude:/\.(css|js|html)$/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]'
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