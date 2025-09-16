import mongoose, { mongo } from "mongoose";

const refreshSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
},{timestamps:true})

export default mongoose.model('refresh',refreshSchema)