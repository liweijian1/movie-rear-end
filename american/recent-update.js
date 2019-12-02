const request = require('request')
const cheerio = require('cheerio')


let updateData = ''
let updateMovie = []
request.get('https://www.meiju33.com/new.html')
       .on('data',data=>{
            updateData +=data
       })
       .on('end',()=>{
           let $ = cheerio.load(updateData)
           $('#list .item .col-md-2').each(
               (index,item)=>{
                   let data = {}
                   item.children.forEach(element => {
                           if(element.name === 'a'){
                               data.title = element.attribs.title
                               data.url = element.attribs.href
                               element.children.forEach(status=>{
                                   if(status.name === 'span' && status.attribs.class=== 'note textbg'){
                                       //console.log(status.children[0].data)
                                       data.status = status.children[0].data
                                   }
                               })
                            //    if(element.children.name === 'span'){
                            //        console.log(element.children.children)
                            //    }
                           }
                       })
                       updateMovie.push(data)
               }
           )
           console.log(updateMovie)
       })