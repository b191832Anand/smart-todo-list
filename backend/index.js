import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router/router.js'
dotenv.config()
const app=express();
app.use(express.json())
app.use(cors());
mongoose.connect("mongodb+srv://anand:1925112816@cluster0.qm0ie67.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("DB Connected"))
app.get('/',(req,res)=>{
    return res.status(200).send("jai sri ram")
})
app.use('/api',router)
app.listen(5000,()=>console.log("server connnected")
)