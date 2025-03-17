import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import blogRoute from './routes/blog.route.js';
import cors from 'cors';

const app = express();
dotenv.config();

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/', // Ensure this directory exists
  })
);

// DB Code
try {
  mongoose.connect(MONGO_URL);
  console.log('Connected to MongoDB');
} catch (error) {
  console.log(error);
}

// Defining routes
app.use('/api/users', userRoute);
app.use('/api/blogs', blogRoute);

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
