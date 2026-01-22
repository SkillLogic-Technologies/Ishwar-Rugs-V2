import express from "express"
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js"
import { isAuth } from "../middlewares/isAuth.middleware.js"

const router = express.Router()

router.get("/", isAuth, getWishlist)
router.post("/:productId", isAuth, addToWishlist);
router.delete("/:productId", isAuth, removeFromWishlist);

export default router;