import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URL){
    throw new Error("please provide mongodb connecting string in .env file");
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connect MONGODB successfully")
    } catch (error) {
        console.log("Error in DB connection",error);
    }
}

export default connectDB
