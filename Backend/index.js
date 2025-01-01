import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express()
dotenv.config();

const port = process.env.PORT;
const MONOGO_URL=process.env.MONOG_URL;
// DB Code
try {
  mongoose.connect(MONOGO_URL);
  console.log('Connected to MongoDB');
} catch (error) {
  console.log(error)
}
console.log ("heyidvyusdg vg  sdghvg us")

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})