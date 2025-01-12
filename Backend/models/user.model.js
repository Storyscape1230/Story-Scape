import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"please enter a vaild email"]
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    photo: {
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    education:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["users","admin"],
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:8
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const User = mongoose.model("User",userSchema);