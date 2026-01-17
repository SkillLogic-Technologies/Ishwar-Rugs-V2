import express from "express"
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, userReview } from '../controllers/productController.js'

const router = express.Router()

router.route("/").get(getProducts).post(createProduct)
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct)
router.route("/:id/review").post(userReview)

export default router;