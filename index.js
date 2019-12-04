const Koa = require('koa')
//const firstPage = require('./american/firstPage')
const http = require('http')
const router = require('./router/koa-router')
const bodyParser = require('koa-bodyparser')
//const cors = require('koa2-cors')


const app = new Koa()


app.use(bodyParser()) //请求参数修改放在router之前
app.use(router.routes())
app.use(router.allowedMethods())

//app.use(cors())
app.listen(3002)
