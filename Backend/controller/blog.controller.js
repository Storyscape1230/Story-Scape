import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";



export const createBlog = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging: Log the request body
    console.log("Request Files:", req.files); // Debugging: Log the request files

    // Check if blogImage is present
    if (!req.files || !req.files.blogImage) {
      return res.status(400).json({ message: "Blog Image is required" });
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    // Validate image format
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid file format. Only JPEG, JPG, PNG, and WEBP are allowed.",
      });
    }

    // Validate required fields
    const { title, category, about } = req.body;
    console.log("Received About:", about); // Debugging: Log the about field
    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "title, category & about are required fields" });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(cloudinaryResponse.error);
      return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
    }

    // Create blog data
    const blogData = {
      title,
      category,
      about,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
      adminName: req.user?.name,
      adminPhoto: req.user?.photo?.url,
      createdBy: req.user?._id,
    };

    // Save blog to database
    const blog = await Blog.create(blogData);

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



/*-----------------Delete Blog------------------*/

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};

/*-----------------Show All Blog------------------*/

export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find();
  res.status(200).json(allBlogs);
};

/*-----------------Show Single Blog------------------*/

export const getSingleBlogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
};

/*-----------------Show My Blog------------------*/

export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy });
  res.status(200).json(myBlogs);
};

/*-----------------Update Blog------------------*/

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate blog ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    // Find the blog by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Extract fields from request body
    const { title, category, about } = req.body;
    console.log("Received data:", { title, category, about }); // Debug log

    // Prepare updated data
    let updatedBlogData = { title, category, about }; // Ensure `about` is included

    // Handle image upload if a new image is provided
    if (req.files && req.files.blogImage) {
      const { blogImage } = req.files;

      // Validate image format
      const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!allowedFormats.includes(blogImage.mimetype)) {
        return res.status(400).json({ message: "Only JPG, PNG, and WEBP are allowed" });
      }

      // Delete the old image from Cloudinary if it exists
      if (blog.blogImage && blog.blogImage.public_id) {
        await cloudinary.uploader.destroy(blog.blogImage.public_id);
      }

      // Upload the new image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
      }

      // Add new image data to updatedBlogData
      updatedBlogData.blogImage = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      };
    }

    // Update the blog in the database
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, { new: true });
    console.log("Blog updated successfully:", updatedBlog); // Debug log

    // Send success response
    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error); // Debug log
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


/*-----------------Upload Blog------------------*/

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid file format. Only JPEG, JPG, PNG, and WEBP are allowed.",
      });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(cloudinaryResponse.error);
      return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      image: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


/*-----------------Creator Profile Show Blog------------------*/

export const getCreatorProfile = async (req, res) => {
  try {
    const { creatorId } = req.params;

    // Fetch creator details
    const creator = await User.findById(creatorId).select("-password");

    if (!creator) {
      return res.status(404).json({ message: "Creator not found " });
    }

    // Fetch blogs created by the specific creator
    const blogs = await Blog.find({ createdBy: creatorId });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found for this creator" });
    }

    res.status(200).json({ creator, blogs });
  } catch (error) {
    console.error("Error fetching creator profile and blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const likeBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    const userId = req.user.id;
    const index = blog.likes.indexOf(userId);

    if (index === -1) {
      blog.likes.push(userId);
      await blog.save();
      return res.status(200).json({ success: true, message: "Blog liked successfully", blog });
    } else {
      blog.likes.splice(index, 1);
      await blog.save();
      return res.status(200).json({ success: true, message: "Blog unliked successfully", blog });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogLikes = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId).populate('likes', 'name photo');
    
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({
      success: true,
      likes: blog.likes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  uploadImage,
  createBlog,
  deleteBlog,
  getAllBlogs,  
  getSingleBlogs,
  getMyBlogs,
  updateBlog,
  getCreatorProfile,
  getBlogLikes,
};