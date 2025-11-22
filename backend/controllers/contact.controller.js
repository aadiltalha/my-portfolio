import Contact from "../models/Contact.js";
import { sendContactNotification } from "../utils/email.js";

export const submitMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    const newMessage = await Contact.create({ name, email, message });

    sendContactNotification(newMessage).catch((err) => {
      console.error("Error sending contact notification email:", err.message);
    });

    res.json({
      success: true,
      message: "Message submitted successfully",
      data: newMessage,
    });
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: messages,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
