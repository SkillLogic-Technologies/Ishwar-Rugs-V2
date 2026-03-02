import express from "express";
import { cancelOrder, createOrder, getAllOrders, getMyOrders, updateOrderStatus } from "../controllers/Order.Controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = express.Router();

router.post("/create", isAuth, createOrder);
router.get("/my-orders", isAuth, getMyOrders);
router.get("/all",isAdmin, getAllOrders);
router.put("/admin/order/:id/status", isAdmin, updateOrderStatus);
router.put("/order/:id/cancel", isAuth, cancelOrder);

export default router;