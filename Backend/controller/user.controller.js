import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";
import { Blog } from "../models/blog.model.js";

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

    const { name, email, phone } = req.body;

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

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const saveBlog = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    if (user.saved.includes(blog._id)) {
      return res.status(400).json({ success: false, message: "Blog already saved" });
    }

    user.saved.push(blog._id);
    await user.save();

    res.status(200).json({ success: true, message: "Blog saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSavedBlogs = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated request
    const user = await User.findById(userId).populate("saved"); // Populate saved blogs

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.saved); // Return saved blogs
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Remove a saved blog from the user's profile
const removeSavedBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogId } = req.params; // Get blog ID from params

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove blog ID from saved array
    user.saved = user.saved.filter((id) => id.toString() !== blogId);
    await user.save();

    res.status(200).json({ message: "Blog removed from saved list", saved: user.saved });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const checkSavedStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = user.saved.includes(blogId);
    res.status(200).json({ isSaved });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/*----------------- Export All Controllers ----------------*/
export { register, login, logout, getMyProfile, getAdmins, updateProfile, saveBlog, getSavedBlogs, removeSavedBlog, checkSavedStatus };
