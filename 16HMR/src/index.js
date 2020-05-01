import './css/iconfont.css'
import { say } from './js/print'
say()
console.log('index.js变化了')
console.log('index.js变化了2')
function add(x, y) {
  return x + y
}
console.log(add(10, 20))
if (module.hot) {
  // 一旦moduule.hot为true，说明开启了HMR功能
  module.hot.accept('./js/print', function() {
    say(123)
  })
}
