import jwt from "jsonwebtoken";
export const isAdmin = (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    console.log("COOKIE TOKEN:", token);
    console.log("SECRET:", process.env.SECRET_KEY);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("DECODED:", decoded);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin only",
      });
    }

    req.admin = decoded;
    next();

  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};