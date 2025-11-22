import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/project.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

// ✅ Create a new project (admin only)
router.post("/", protect, upload.single("image"), createProject);

// ✅ Get all projects (public)
router.get("/", getProjects);

// ✅ Get single project by ID (public)
router.get("/:id", getProjectById);

// ✅ Update project (admin only)
router.put("/:id", protect, upload.single("image"), updateProject);

// ✅ Delete project (admin only)
router.delete("/:id", protect, deleteProject);

export default router;
