/*
  此文件是webpack的配置文件
  作用：指示webpack干那些活（当运行webpack指令时，会加载里面的配置）

  所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs（module.exports）,我们的src代码是采用ES6模块化
*/
// resolve用来拼接绝对路径的方法
const {resolve} =require('path')
module.exports={
  // webpack配置
  // 入口起点
  entry:'./src/index.js',
  // 输出
  output:{
    // 输出文件名
    filename:'build.js',
    // 输出路径（绝对路径）
    // __dirname是nodejs的变量,代表当前文件的目录绝对路径
    path:resolve(__dirname,'build')
  },
  // loader配置
  module:{
    rules:[
      // 详细loader配置
      {
        // 匹配哪些文件
        test:/\.css$/,
        // 使用loader处理
        use:[
          // use数组中loader执行顺序：从右到左，从下到上依次执行
          // 创建一个style标签，将js中的css样式资源插入进去，添加到页面header中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串，为上面style-loader做插入准备
          'css-loader'
        ]
      },
      {
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载less和less-loader
          'less-loader'
        ]
      }
    ]
  },
  // plugins配置
  plugins:[

  ],
  // 模式
  mode:'development',
  // mode:'production',
}