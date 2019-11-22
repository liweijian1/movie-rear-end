const Router = require('koa-router')
const router = new Router()
const MovieData = require('../american/main')

let ceshiData = []



//koa原生cors跨域
router.all('*',async(ctx,next) => {
  ctx.set('Access-Control-Allow-Origin','*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  await next()
})
router.get('/data',
async(ctx,next)=>{
     ctx.status = 200
     ceshiData = await MovieData.firstPageData()
     ctx.body = {
       data:ceshiData,
       code:200,
       success:true
     }
     await next()
})




module.exports = router