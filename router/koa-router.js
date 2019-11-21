const Router = require('koa-router')
const router = new Router()

//koa原生cors跨域
router.all('*',(ctx,next) => {
  ctx.set('Access-Control-Allow-Origin','*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next()
})
router.get('/data',(ctx,next)=>{
    ctx.status = 200,
    ctx.body = '成功'
    next()
})




module.exports = router