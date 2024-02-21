import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongodb_uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@local.lafv8pq.mongodb.net/${process.env.MONGO_DATABASE}`

async function connectDB(): Promise<void>{
    try {
        await mongoose.connect(mongodb_uri);
    } catch (error: any) {
        throw Error(error);
    }
}

export default connectDB;