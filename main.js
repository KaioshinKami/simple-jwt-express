const express=require('express')
const mongoose=require('mongoose')
const authRouter=require('./authRouter')

const PORT=process.env.PORT || 5000;

const app=express()

app.use(express.json())
app.use('/auth', authRouter)

const start= async ()=>{
    try{
        await mongoose.connect('mongodb+srv://user123:user123@jwt-simple.xqmwn.mongodb.net/?retryWrites=true&w=majority&appName=jwt-simple')
        app.listen(PORT, ()=>{
            console.log(`server work ${PORT}`)
        })
    }catch (e){
        console.log(e)
    }
}

start()