import express from "express";
import {
  submitMessage,
  getMessages,
  deleteMessage
} from "../controllers/contact.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public: website visitors can submit messages
router.post("/", submitMessage);

// Admin-only read messages
router.get("/", protect, getMessages);

// Admin-only delete message
router.delete("/:id", protect, deleteMessage);

export default router;
