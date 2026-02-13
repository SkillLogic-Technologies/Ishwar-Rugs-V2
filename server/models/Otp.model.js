import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique:true
    },
    otp: {
      type: String,
      required: true
    },
   expiresAt: {
      type: Date,
      default: () => Date.now() + 5 * 60 * 1000,
      index: { expires: "5m" }
    }
    
},{timestamps:true});

const Otp = mongoose.model("OTP", otpSchema);
export default Otp;