import express from "express";
import {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonial.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

// Public
router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);

// Admin only
router.post("/", protect, upload.single("image"), createTestimonial);
router.put("/:id", protect, upload.single("image"), updateTestimonial);
router.delete("/:id", protect, deleteTestimonial);

export default router;
