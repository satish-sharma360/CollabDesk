import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    phone:{
        type:String,
        required:true
    },
    activated:{
        type:Boolean,
        required:false,
        default:false
    }
},{timestamps:true})

export default mongoose.model('user',userSchema)