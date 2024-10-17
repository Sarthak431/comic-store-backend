import mongoose from "mongoose";
import catchAsync from './../utils/catchAsync.js';


const db = process.env.DB_STRING.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);

const connectDB = catchAsync(async () => {
  await mongoose.connect(process.env.DB_STRING.replace('<db_password>', process.env.DB_PASSWORD));
  console.log('MongoDB Connected');
});

export default connectDB;
