import express from "express";
import {
  trackVisit,
  getDailyUsers,
  getUsersGraph,
} from "../controllers/activityController.js";

import { attachIdentity } from "../middlewares/attachIdentity.middleware.js"
import { optionalAuth } from "../middlewares/optionalAuth.middleware.js";

const router = express.Router();

router.post(
  "/track-visit",
  optionalAuth,
  attachIdentity,
  trackVisit
);

router.get("/daily-users", getDailyUsers);

router.get("/users-graph", getUsersGraph);

export default router;
