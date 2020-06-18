const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const db = require('./database/db.js')




nunjucks.configure('src/views',{
    express: app,
    noCache: true
})
app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    console.log('pag inicial')
    
    return res.render('index.html')
})



app.get('/register',(req,res)=>{

    
    

    return res.render('register.html')
})

app.post("/savepoint",(req,res)=>{
    const query = `
        INSERT INTO places(
            imagem,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES(?, ?, ?, ?, ?, ?, ?);


    `
    const values = [
        req.body.imagem,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]   
    db.run(query,values,function(err){
        if(err){
            return console.log(err);            
        }
        console.log('cadastrado');

        console.log(this);
    
        return res.render('register.html',{saved:true})
    })

    
    


})



app.get('/search',(req,res)=>{

    const search = req.query.search

    if(search == ''){
        return res.render('search-results.html',{total:0})
        
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `,function(err,rows){
        if(err){
            return console.log(err)            
        }
        console.log('Aqui estão seus registros')
        
        const total = rows.length
        console.log(rows);
        
        return res.render('search-results.html',{places:rows,total:total})
        
    })
    
})

app.get("/deletar:id",(req,res)=>{
     db.run(`DELETE FROM places WHERE id=?`,[req.params.id],function(err){
         if(err){
             return console.log(err)
            
         }
         console.log('Registro deletado com sucesso!')
     })
    return res.send('dados apagados')

})




app.listen(3333,()=>console.log('porta 3333 aberta'))
