let mysql = require('mysql')


module.exports = (sql,database='school',post={})=>{
    return new Promise((resolve,reject)=>{
      
        let connection = mysql.createConnection({
            host     : '49.234.74.40',
            user     : 'root',
            password : '921226LWJlwj!',
            port     : '3306',
            database : database
          });
        connection.connect();
        if(Object.keys(post).length===0){
            connection.query(sql,(err,res)=>{
                if(err){
                    reject('[SELECT ERROR] - ',err.message)
                    return;
                }
                resolve(JSON.parse(JSON.stringify(res)))
            })
        }else{
            connection.query(sql,post,(err)=>{
                if(err){
                    reject(err)
                    return
                }
                resolve(JSON.parse(JSON.stringify(true)))
            })
        }
     
        connection.end()
    })
    
}
