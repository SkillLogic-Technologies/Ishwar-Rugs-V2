import Otp from '../models/Otp.model.js';
import sendOtp from '../utils/Otp.util.js';
import User from '../models/User.model.js'
import jwt from 'jsonwebtoken'

export const loginUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const subject = " Ishwarugs";

        if (!username || !email) {
          return res.status(400).json({
                success:false, 
                message:"username and email required"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000);

        
        const prevOtp = await Otp.findOne({email});
        if (prevOtp) {
            await prevOtp.deleteOne();
        }

        await sendOtp({
            email,
            subject,
            otp
        });

        await Otp.create({
            username,
            email,
            otp
        });

         res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });
        
    } catch (error) {
        res.status(400).json({Success:false, message:"Failed to send OTP"})
    }
}


export const verifyLoginOtp = async (req, res) => {
    try {
        const {username, email, otp} = req.body;

        if (!username || !email || !otp) {
           return res.status(400).json({success:false, message:"All fields required"})
        }

        const haveOtp = await Otp.findOne({ email, otp });
            if(!haveOtp){
            return res.status(400).json({
                success:false,
                message:"Wrong otp"
            })
        }


       let user = await User.findOne({ email });

        if (!user) {
        user = await User.create({
            username,
            email,
            role: "user"
        });
        }

        const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: "3d" }
        );
            res.cookie("token", token, {
            httpOnly: true,   
            secure: false,    
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        await haveOtp.deleteOne();

        return res.status(200).json({
        success: true,
        message: "User loggedIn",
        user,
        token
        });
    } catch (error) {
        res.status(500).json({Success:false, message:"OTP verification failed"})
    }
}


export const myProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user)
}