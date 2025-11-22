import express from "express";
import {
  incrementPageView,
  getSummary,
} from "../controllers/analytics.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route: website increments views
router.post("/increment", incrementPageView);

// Admin-only: dashboard summary
router.get("/summary", protect, getSummary);

export default router;
