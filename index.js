const express =require('express')
const mongoose =require('mongoose')
const app =express()
app.use('/',require('./routes/getRoute'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('views','views')
app.set("view engine","jade")
app.use(express.static("public"))
app.use('/post',require('./routes/postRoute'))
app.listen(3003,async()=>{
    await mongoose.connect('mongodb+srv://Aro:aro123@arockiajeyson.aswzaya.mongodb.net/?retryWrites=true&w=majority')
    console.log('db connected')
    console.log('port is up')
}) 


