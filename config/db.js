import mongoose from "mongoose"; 
import catchAsync from './../utils/catchAsync.js'; 

// Connect to MongoDB using async error handling
const connectDB = catchAsync(async () => {
  await mongoose.connect(process.env.DB_STRING.replace('<db_password>', process.env.DB_PASSWORD));
  console.log('MongoDB Connected');
});

export default connectDB; 
