import Blog from "../models/Blog.js";
import cloudinary from "../utils/cloudinary.js";

export const createBlog = async (req, res, next) => {
  try {
    let imgUrl = "";

    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path);
      imgUrl = uploaded.secure_url;
    }

    // ✅ Handle tags robustly (string, array, or undefined)
    let tags = [];
    if (typeof req.body.tags === "string") {
      tags = req.body.tags.split(",").map(t => t.trim()).filter(Boolean);
    } else if (Array.isArray(req.body.tags)) {
      tags = req.body.tags.map(t => t.trim()).filter(Boolean);
    }

    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      image: imgUrl,
      tags,
    });

    res.json({
      success: true,
      message: "Blog created",
      data: blog,
    });
  } catch (err) {
    next(err);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const total = await Blog.countDocuments();
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      data: blogs,
    });
  } catch (err) {
    next(err);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    let updates = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    };

    // ✅ Handle tags in updates too
    if (typeof req.body.tags === "string") {
      updates.tags = req.body.tags.split(",").map(t => t.trim()).filter(Boolean);
    } else if (Array.isArray(req.body.tags)) {
      updates.tags = req.body.tags.map(t => t.trim()).filter(Boolean);
    }

    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path);
      updates.image = uploaded.secure_url;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json({
      success: true,
      message: "Blog updated",
      data: blog,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Blog deleted",
    });
  } catch (err) {
    next(err);
  }
};
