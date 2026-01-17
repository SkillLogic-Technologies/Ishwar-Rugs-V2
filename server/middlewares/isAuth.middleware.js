import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login"
      });
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decodedData.userId);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};
