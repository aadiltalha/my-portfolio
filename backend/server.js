import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";

import path from "path";
import { fileURLToPath } from "url";

import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting (anti-brute-force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS setup
// For a public portfolio/demo we allow all origins to avoid CORS issues.
// If you prefer stricter control, replace origin: "*" with a whitelist.
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Body parsers — CRITICAL for JSON + form-data text fields
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static resume
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/api/resume", express.static(path.join(__dirname, "public/resume")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);

// Health / info endpoint for GET /api
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "API is up. Use /api/projects, /api/blogs, /api/testimonials, etc.",
  });
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.info(`Server running on port ${PORT}`)
);
