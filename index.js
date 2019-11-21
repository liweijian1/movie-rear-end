const Koa = require('koa')
//const firstPage = require('./american/firstPage')
const http = require('http')
const router = require('./router/koa-router')
//const cors = require('koa2-cors')

const app = new Koa()

app.use(router.routes())
//app.use(cors())
app.listen(3002)
