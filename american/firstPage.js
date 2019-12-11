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

let firstPageInfor = {
    movieTitle:[],
    movieType:[],
}


module.exports = function firstPageData(){
    return new Promise((resolve,reject)=>{
        let firstMovie = ''
        request
        .get('https://www.meiju33.com/')
         .on('data',data=>{
          firstMovie += data
      })
       .on('end',()=>{
          let $ = []
          let moviedata = []
        //   let movietype = []
        firstPageInfor.movieTitle = []
        firstPageInfor.movieType = []
          $ = cheerio.load(firstMovie.toString())                                                                                                                                                      
          $('.col-lg-7.col-md-6.col-sm-12 a').each((index,element)=>{
            moviedata.push(element.attribs)
          })
          moviedata.forEach((item,index)=>{
              if(item.title !== undefined && item.title !== ''){
                firstPageInfor.movieTitle.push({
                      sid:index,
                      url:`${item.href}`,
                      title:`${item.title}`,
                      style:`${item.style}`
                  }) 
                 }
         })
         $('.hy-index-tags.active.hidden-md.clearfix a').each((index,element) => {
            firstPageInfor.movieType.push(element.children[0].data)
         })   
         resolve(firstPageInfor) 
         
        //   let writeStream = fs.createWriteStream('movie.html')
        //   writeStream.write(firstMovie.toString(),'utf-8')
        //   writeStream.end()
        //   writeStream.on('finish',()=>{
        //       console.log('结束')
        //   })
       })
       .on('err',(err)=>{
           reject(err)
       })
    })
}


