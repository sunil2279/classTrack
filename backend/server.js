import express from 'express'
import cors from 'cors';
import dotenv from'dotenv';
import mongoose from 'mongoose';

import studentRoutes from "./routes/studentRoutes.js";
import adminRoute from "./routes/authRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/student",studentRoutes);
app.use("/api/admin",adminRoute);

const MONGO_URL = process.env.MONGO_URL;


app.get("/",(req,res) => {
    res.send("server working fine!");
})
const start = async () => {
    const connectDB = await mongoose.connect(MONGO_URL);
    app.listen(9000,() => {
        console.log(`server running on port ${9000}`);
    })
}

start();

