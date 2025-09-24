import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATA_BASE);
    console.log('DB CONNECTED OK');
  } catch (error) {
    console.log('There is an error:', error);
    process.exit(1); // stop the app
  }
};

export default connectDB;
