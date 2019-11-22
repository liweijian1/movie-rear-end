const http = require('http')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/db',{useNewUrlParser: true,useUnifiedTopology:true})
mongoose.connection.on('err',()=>{
    console.log('连接数据库失败')
})
const Schma = new mongoose.Schema({
   url:'',
   title:''
})

const firstmovie = mongoose.model('FirstMovie',Schma)
let firstMovie = ''

module.exports = function firstPageData(){
    return new Promise((resolve,reject)=>{
        request
        .get('https://www.meiju33.com/')
         .on('data',data=>{
          firstMovie += data
      
      })
       .on('end',()=>{
           let data = []
           let movieTitle = []
          let $ = cheerio.load(firstMovie.toString())                                                                                                                                                         
          $('.col-md-6 a .title').each((index,element)=>{
              data.push(element)
          })
          data.forEach((item,index)=>{
              if(item.children[0].data !== undefined && item.children[0].data !== ''){
                 //movieTitle.push(item.parent.attribs.href)
                  movieTitle.push({
                      url:`${item.parent.attribs.href}`,
                      title:`${item.parent.attribs.title}`
                  }) 
                 }
         })
         firstmovie.find({},(err,data)=>{
              if(err){
                  console.log(err)
              }else{
                  let title = []
                  data.forEach(item => {
                      title.push(item.title)
                  })
                  movieTitle.forEach(item => {
                      if(!title.includes(item.title)){
                         firstmovie.create(item)
                      }
                  })
              }
         })
         firstmovie.find({},(err,data)=>{
             if(err){
                 reject(err)
             }
             else{
                 resolve(data)
             }
         })
          // let writeStream = fs.createWriteStream('out.txt')
          // writeStream.write(movieTitle.toString(),'utf-8')
          // writeStream.end()
          // writeStream.on('finish',()=>{
          //     console.log('结束')
          // })
       })
    })
}


