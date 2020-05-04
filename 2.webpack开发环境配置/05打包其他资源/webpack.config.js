/*
  打包之后的哈希值是否变化：如果文件发生变化就会变化
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
  mode:'development'
}