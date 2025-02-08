import mongoose from "mongoose";

const task=new mongoose.Schema({
    to_id:{
        type:String
    },
    subject:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    completed:{
        type:Boolean,
         default:false
    }
})

export default mongoose.model("task",task);