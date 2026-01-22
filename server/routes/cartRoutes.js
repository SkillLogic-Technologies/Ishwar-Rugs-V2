import express from "express";
import { addToCart, updateQuantity, removeFromCart, getCart } from "../controllers/cartController.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";

const router = express.Router();

router.get("/", isAuth, getCart);
router.post("/:productId", isAuth, addToCart);
router.put("/:productId", isAuth, updateQuantity);
router.delete("/:productId", isAuth, removeFromCart);

export default router;
