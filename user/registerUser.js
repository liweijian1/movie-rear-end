const sqlConnect = require('./../sql/mySqlConnection')

// module.exports = function registerMethod(userdata){
//    return new Promise((resolve)=> {
//     user.find({userName:userdata.userName},(err,data)=> {
//         if(err){
//             return err
//         }else{
//             //单等号是赋值
//             if(data.length === 0){
//                user.create(userdata,(error,item)=>{
//                    if(error){
//                        return error
//                    }else{
//                     resolve(true)
//                    }
//                })
//             }
//             else{
//                 resolve(false)
//             }
//         }
//     })
//    })
// }

module.exports = function registerMethod(userdata){
    return new Promise((resolve,reject)=>{
        let sql = `select * from tb_student where stuname = '${userdata.userName}'`
        sqlConnect(sql,'school').then(res=>{
           if(Object.keys(res).length>0){
               resolve(false)
           }else{
            let post = {
                stuid:Number(userdata.passWord),
                stuname:userdata.userName,
                stusex:true,
                stubirth:null,
                stuaddr:'',
                collid:1
            }
            let sql = 'insert into tb_student set ?'
            sqlConnect(sql,'school',post).then(res=>{
                resolve(res)
              }).catch((err)=>{
                  if(err){
                    reject(err)
                  }
              })
           }
        })
    
    })
}