import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router/router.js'
dotenv.config()
const app=express();
app.use(express.json())
app.use(cors());
mongoose.connect(process.env.URL).then(()=>console.log("DB Connected"))
app.get('/',(req,res)=>{
    return res.status(200).send("jai sri ram")
})
app.use('/api',router)
app.listen(5000,()=>console.log("server connnected")
)