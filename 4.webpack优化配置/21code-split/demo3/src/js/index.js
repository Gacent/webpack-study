// import { mul } from './test'
function sum(...args) {
  return args.reduce((p, c) => p + c, 0)
}
console.log(sum(1, 2, 3, 4, 5))
import(/* webpackChunkName:'test'*/'./test').then(({ mul }) => {
  console.log(mul(5, 6))
}).catch((err) => {
  console.log(err)
})
