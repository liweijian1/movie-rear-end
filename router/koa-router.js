const Router = require('koa-router')
const MovieData = require('../american/main')
const usreData = require('../user/user')
const registUser = require('../user/registerUser')
const firstPageData = require('../american/firstPage')

const router = new Router()

let ceshiData = []



//koa原生cors跨域
router.all('*',async(ctx,next) => {
  ctx.set('Access-Control-Allow-Origin','*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  await next()
})
router.get('/data',async(ctx,next)=>{
     ctx.status = 200
     ceshiData = await MovieData.firstPageData()
     ctx.body = {
       data:ceshiData,
       code:200,
       success:true
     }
     await next()
})
router.post('/login',async(ctx,next)=>{
     ctx.status = 200
     let postData = ctx.request.body
     let data = []
     data = await usreData(postData)
     if(data.length === 0){
       ctx.body = {
         code:200,
         success:false,
         data:[]
       }
     }
     else{
       ctx.body = {
        code:200,
        success:true,
        data:data
       }
     }
     await next()
})
router.post('/register',async(ctx,next)=> {
        ctx.status = 200
        let data = await registUser(ctx.request.body)
        if(data){
          ctx.body = {
            code:200,
            success:true,
            data:data
          }
        }
        else{
          ctx.body = {
            code:200,
            success:false,
            data:data
          }
        }
        await next()
})
  router.get('/swiper',async(ctx,next)=>{
     ctx.status = 200
     let data = {}
     data = await firstPageData()
     console.log(data)
     ctx.body = {
        code:200,
        success:true,
        data:data
      }
     await next()
  })
  // router.get('./hotData',async(ctx,next)=>{
  //        ctx.status = 200

  //        await next()
         
  // })





module.exports = router