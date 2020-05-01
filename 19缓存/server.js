// 服务器代码
// 启动服务器指令
/**
 * 方式1：
 * node i nodemon -g
 * nodmon server.js
 * 方式2：
 * node server.js
 *
 * 访问：http://localhost:3000
 */
const express = require('express')
const app = express()
app.use(express.static('dist', { maxAge: 1000 * 3600 }))
app.listen(3000)
