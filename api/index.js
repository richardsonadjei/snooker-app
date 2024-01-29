import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import saleRouter from './routes/sale.routes.js';
import expenseRouter from './routes/expense.routes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });
  const __dirname = path.resolve();
const app = express();
app.use(cookieParser());

// Add body-parser middleware to parse JSON data
app.use(express.json());

// Routes
app.use('/api/', userRouter);
app.use('/api/', saleRouter);
app.use('/api/', expenseRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

// Global error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
