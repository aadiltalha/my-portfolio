import Testimonial from "../models/Testimonial.js";
import cloudinary from "../utils/cloudinary.js";

export const createTestimonial = async (req, res, next) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploaded.secure_url;
    }

    const testimonial = await Testimonial.create({
      name: req.body.name,
      message: req.body.message,
      rating: req.body.rating,
      image: imageUrl,
    });

    res.json({
      success: true,
      message: "Testimonial created",
      data: testimonial,
    });
  } catch (err) {
    next(err);
  }
};

export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    next(err);
  }
};

export const getTestimonialById = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: testimonial });
  } catch (err) {
    next(err);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const updates = {
      name: req.body.name,
      message: req.body.message,
      rating: req.body.rating,
    };

    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path);
      updates.image = uploaded.secure_url;
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json({
      success: true,
      message: "Testimonial updated",
      data: testimonial,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    next(err);
  }
};
