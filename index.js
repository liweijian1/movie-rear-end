const Koa = require('koa')
//const firstPage = require('./american/firstPage')
const http = require('http')
const router = require('./router/koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors') //跨域


const app = new Koa()

app.use(cors(
    {
        origin: function() {
          return '*';
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE','OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      }
))
app.use(bodyParser()) //请求参数修改放在router之前
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3002)
