import Analytics from "../models/Analytics.js";
import Project from "../models/Project.js";
import Blog from "../models/Blog.js";
import Testimonial from "../models/Testimonial.js";
import Contact from "../models/Contact.js";

export const incrementPageView = async (req, res, next) => {
  try {
    let record = await Analytics.findOne();
    if (!record) {
      record = await Analytics.create({ pageViews: 1 });
    } else {
      record.pageViews += 1;
      await record.save();
    }

    res.json({
      success: true,
      message: "Page view recorded",
      data: record.pageViews,
    });
  } catch (err) {
    next(err);
  }
};

export const getSummary = async (req, res, next) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const totalTestimonials = await Testimonial.countDocuments();
    const totalMessages = await Contact.countDocuments();

    const analytics = await Analytics.findOne();
    const pageViews = analytics ? analytics.pageViews : 0;

    res.json({
      success: true,
      data: {
        totalProjects,
        totalBlogs,
        totalTestimonials,
        totalMessages,
        pageViews,
      },
    });
  } catch (err) {
    next(err);
  }
};
