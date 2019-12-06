# movie-rear-end
1.koa-router使用async问题，必须要让所有请求都使用async/await,才会生效
outer.get('/data',async(ctx,next)=>{
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

2.后端接口数组赋值会重复，无法清空问题
