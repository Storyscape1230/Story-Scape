import { User } from "../models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import bycryp from 'bcryptjs';
import createTokenAndSaveCookies from "../jwt/AuthToken.js"

export const register=async(req,res) => {

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({message:"Please upload a file"});
    }
    const {photo}=req.files;

    const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
    if(!allowedFormats.includes(photo.mimetype)){
        return res.status(400).json({message: "Please upload a valid image. Only JPG and PNG are allowed."});
    }
    
    const { email,name,password,phone,education,role}=req.body;
    
    if(!email || !name || !password || !phone || !education || !role || !photo){
        return res.status(400).json({message:"Please fill required fields"});
    }
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({message : "user already exists"})
    }


    console.log("Temp file path:", photo.tempFilePath);
    const cloudinaryResponse = await cloudinary.uploader.upload(
        photo.tempFilePath
    )
    console.log("Cloudinary configuration:", cloudinary.config());
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log(cloudinaryResponse.error)
    }

    const hashedPassword = await bycryp .hash(password, 10);
    const newUser =new  User({email,name,password: hashedPassword,phone,education,role,photo:{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url
    }});
    await newUser.save();
    if (newUser){
        const token =  await createTokenAndSaveCookies(newUser._id,res)
        res.status(201).json({message:"User registered successfully", newUser, token: token});
    }
};