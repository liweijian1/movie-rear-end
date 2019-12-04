const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/db',{useNewUrlParser: true,useUnifiedTopology:true})

mongoose.connection.on('err',()=>{
    console.log('数据库连接失败')
})

const schema = new mongoose.Schema({
    userName:'',
    passWord:''
})

const user = mongoose.model('user',schema)

module.exports = user

