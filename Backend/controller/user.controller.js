import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";



/*-----------------Register----------------*/

export const register = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const { photo } = req.files;
  
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Please upload a valid image. Only JPG and PNG are allowed.",
      });
    }
  
    const { email, name, password, phone, education, role } = req.body;
  
    if (!email || !name || !password || !phone || !education || !role || !photo) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
  
    console.log("Temp file path:", photo.tempFilePath);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    console.log("Cloudinary configuration:", cloudinary.config());
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: hashedPassword, phone, education, role, photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });
    await newUser.save();
    if (newUser) {
      const token = await createTokenAndSaveCookies(newUser._id, res);
      console.log("Singup: ", token);
      res.status(201).json({ message: "User registered successfully", newUser, token: token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
}


/*-----------------Login------------------*/

export const login = async (req, res) => {  
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }
    let token = await createTokenAndSaveCookies(user._id, res);
    console.log("Login: ", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};



/*-----------------Logout-----------------*/

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};


/*-----------------My Profile----------------*/

export const getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json({ user });
};


/*---------------All Admins show--------------*/

export const getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" });
  res.status(200).json({ admins });
};
