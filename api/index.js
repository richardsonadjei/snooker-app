import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
// Add body-parser middleware to parse JSON data
app.use(express.json());

app.use('/api/', userRouter);







app.listen(3000, () => {
   
  console.log('Server is running on port 3000!');
});