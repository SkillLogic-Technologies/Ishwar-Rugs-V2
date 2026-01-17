import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import userRoute from './routes/User.route.js';


import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoute);


app.listen(PORT, () => {
    connectDB();
    console.log(`server runing at PORT: ${PORT}`); 
});