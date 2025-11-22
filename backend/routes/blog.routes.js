import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();


// PUBLIC ROUTES
router.get("/", getBlogs);
router.get("/:id", getBlogById);


// ADMIN ROUTES


// Create a new blog post
router.post("/", protect, upload.single("image"), createBlog);

// Update a blog post
router.put("/:id", protect, upload.single("image"), updateBlog);

// Delete a blog post
router.delete("/:id", protect, deleteBlog);

//  INLINE IMAGE UPLOAD (for the editor)

// This route allows your admin dashboard editor (React-Quill) to upload images
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogs", // optional Cloudinary folder
      resource_type: "image",
    });

    res.json({
      success: true,
      url: uploaded.secure_url,
    });
  } catch (err) {
    console.error("Image upload error:", err);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
});

export default router;
