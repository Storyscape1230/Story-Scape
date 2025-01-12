import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import userRoute from './routes/user,route.js';
import { v2 as cloudinary } from 'cloudinary';

const app = express()
dotenv.config();

const port = process.env.PORT;
const MONOGO_URL=process.env.MONOG_URL;


//middleware
app.use(express.json());

app.use(
  fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/', // Ensure this directory exists
  })
);

// DB Code
try {
  mongoose.connect(MONOGO_URL);
  console.log('Connected to MongoDB');
} catch (error) {
  console.log(error)
}

//definding routes
app.use('/api/users', userRoute);

//Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})