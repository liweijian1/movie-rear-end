const user = require('./userConnection')


module.exports = function userName(data){
  return  user.find(data,(err,data)=>{
       if(err){
           return false
       }
       else{
          return data
       }
    })
} 