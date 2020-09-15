const sqlConnect = require('./../sql/mySqlConnection')
 
module.exports = function userName(data){
  return new Promise((resolve,reject)=>{
    let sql = 'select * from tb_student'
    sqlConnect(sql,'school').then(res=>{
      let obj = res.filter(item=>{
         if(item.stuname===data.userName&&item.stuid===Number(data.passWord)){
           return item
         }
      })
      resolve(obj)
    }).catch((err)=>{
        if(err){
          reject(err)
        }
    })
  })
} 