// import '@babel/polyfill'; // 全部兼容语法都引入了，很暴力，体积很大

const add = (x, y) => x + y;
// 下一行eslint所有规则都失效（下一行不进行eslint检查）
// eslint-disable-next-line
console.log(add(2, 5));

const ps = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完');
    resolve();
  }, 1000);
});
