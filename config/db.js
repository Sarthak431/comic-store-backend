import mongoose from "mongoose";

const db = process.env.DB_STRING.replace('<db_password>', process.env.DB_PASSWORD)

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;