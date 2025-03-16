import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    const { blogImage } = req.files;
    console.log("Uploading image:", blogImage.name);

    const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid file format. Only JPEG, JPG, PNG, and WEBP are allowed.",
      });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
    console.log("Cloudinary response:", cloudinaryResponse);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary error:", cloudinaryResponse.error);
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

export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }

    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "title, category & about are required fields" });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
      return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
    }

    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };

    const blog = await Blog.create(blogData);

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const { title, category, about } = req.body;
    let updatedBlogData = { title, category, about };

    if (req.files && req.files.blogImage) {
      const { blogImage } = req.files;
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

      updatedBlogData.blogImage = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, { new: true });
    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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
};