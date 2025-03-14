import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

/*----------------- Register ----------------*/
const register = async (req, res) => {
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
      return res.status(400).json({ message: "User already exists" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      email, 
      name, 
      password: hashedPassword, 
      phone, 
      education, 
      role, 
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });
    
    await newUser.save();
    const token = await createTokenAndSaveCookies(newUser._id, res);
    
    res.status(201).json({ message: "User registered successfully", newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*----------------- Login ----------------*/
const login = async (req, res) => {  
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }

    const token = await createTokenAndSaveCookies(user._id, res);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*----------------- Logout ----------------*/
const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*----------------- Get My Profile ----------------*/
const getMyProfile = async (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
};

/*----------------- Get All Admins ----------------*/
const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json({ admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/*----------------- Update Profile ----------------*/
  const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, phone, education } = req.body;

    if (req.files && req.files.photo) {
      const { photo } = req.files;
      const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedFormats.includes(photo.mimetype)) {
        return res.status(400).json({ message: "Only JPG and PNG are allowed" });
      }

      // Delete old Cloudinary image
      if (user.photo.public_id) {
        await cloudinary.uploader.destroy(user.photo.public_id);
      }

      // Upload new image
      const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
      user.photo = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      };
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.education = education || user.education;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*----------------- Export All Controllers ----------------*/
export { register, login, logout, getMyProfile, getAdmins, updateProfile };
