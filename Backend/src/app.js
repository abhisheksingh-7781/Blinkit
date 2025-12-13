import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from './db/db.js'
import userRouter from "../src/routes/user.routes.js"



const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.FRORNTEND_URL,
    })
);

app.use(cookieParser());

app.use(express.json());

app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

app.use(morgan());
connectDB()


app.use("/api/user",userRouter)

export default app;

