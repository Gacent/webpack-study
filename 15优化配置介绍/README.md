# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化

## 开发环境性能优化
* 优化打包构建速度
  * HMR：热模块替换
* 优化代码调试
  * source-map

## 生产环境性能优化
* 优化打包构建速度
  * oneOf
  * babel缓存（js文件）
  * 多进程打包  
  * externals
  * dll
* 优化代码运行的性能
  * 缓存（hash(整体的hash)-chunkhash(来自同一个入口就是同一个chunk)-contenthash(根据文件内容生成hash)）
  * tree-sharking（需要开启es6模块化，production自动执行）
  * code split
  * 懒加载/预加载
  * PWA
