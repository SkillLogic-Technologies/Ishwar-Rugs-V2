import express from "express";
import { getDashboardStats } from "../controllers/dashboardStatsController.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
const router = express.Router();

router.get("/dashboard-stats",isAdmin, getDashboardStats);

export default router;