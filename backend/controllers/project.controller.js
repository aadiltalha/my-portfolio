import Project from "../models/Project.js";
import cloudinary from "../utils/cloudinary.js";

// ✅ Helper to normalize techStack safely
function normalizeTechStack(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map((t) => t.trim()).filter(Boolean);
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

// ✅ CREATE PROJECT
export const createProject = async (req, res, next) => {
  try {
    console.log("🧾 req.body:", req.body);
    console.log("📷 req.file:", req.file);

    let imageUrl = "";

    // Upload image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      techStack: normalizeTechStack(req.body.techStack),
      image: imageUrl,
      githubLink: req.body.githubLink,
      liveLink: req.body.liveLink,
    });

    res.json({
      success: true,
      message: "Project created",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ GET ALL PROJECTS
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

// ✅ GET SINGLE PROJECT
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Not found" });

    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE PROJECT
export const updateProject = async (req, res, next) => {
  try {
    const updates = {
      title: req.body.title,
      description: req.body.description,
      techStack: normalizeTechStack(req.body.techStack),
      githubLink: req.body.githubLink,
      liveLink: req.body.liveLink,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updates.image = result.secure_url;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json({
      success: true,
      message: "Project updated",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE PROJECT
export const deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    next(err);
  }
};
