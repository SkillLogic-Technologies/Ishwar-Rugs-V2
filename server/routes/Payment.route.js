import express from "express";
import { verifyRazorpayPayment } from "../controllers/Payment.Controller.js";

import { isAuth } from "../middlewares/isAuth.middleware.js";

const router = express.Router();

router.post("/verify", isAuth, verifyRazorpayPayment);

export default router;