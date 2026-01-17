import mongoose from 'mongoose';

export const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection Successfully...");
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({success:false, message:"Database connection Failed"})
    }
}