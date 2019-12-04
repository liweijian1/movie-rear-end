const user = require('./userConnection')

module.exports = function registerMethod(userdata){
   return new Promise((resolve)=> {
    user.find({userName:userdata.userName},(err,data)=> {
        if(err){
            return err
        }else{
            //单等号是赋值
            if(data.length === 0){
               user.create(userdata,(error,item)=>{
                   if(error){
                       return error
                   }else{
                    resolve(true)
                   }
               })
            }
            else{
                resolve(false)
            }
        }
    })
   })
}