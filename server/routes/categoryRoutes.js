import express from "express"
import { createCategory, getCategories, getCategoryBySlug, updateCategory, deleteCategory } from '../controllers/categoryController.js'
import { upload } from "../middlewares/upload.js";
import { isAuth } from "../middlewares/isAuth.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"

const router = express.Router();

router.route("/")
.get(getCategories)
.post(isAuth, isAdmin, upload.single("image"), createCategory)

router.route("/:id")
.put(isAuth, isAdmin, upload.single("image"), updateCategory)
.delete(isAuth, isAdmin, deleteCategory)

router.route("/:slug").get(getCategoryBySlug)

export default router;