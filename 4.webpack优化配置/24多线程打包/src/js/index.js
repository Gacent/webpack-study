import { mul } from './test'
import '../css/index.css'
function sum(...args) {
  return args.reduce((p, c) => p + c, 0)
}
console.log(sum(1, 2, 3, 4, 5))
console.log(mul(2, 36))

/**
 * 1. eslint不认识window、navigator全局变量
 *    解决：需要修改package.json中eslintConfig配置
 *          env:{
 *            "browser":true
 *          }
 * 2. sw必须运行再服务器上
 *    --> nodejs
 *    -->
 *       npm i serve -g
 *       serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
 */
// 注册serviceWorker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('serviceworker注册成功')
      })
      .catch(() => {
        console.log('sw注册失败')
      })
  })
}
