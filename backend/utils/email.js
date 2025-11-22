// utils/email.js
import nodemailer from "nodemailer";

export const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // e.g. "smtp.gmail.com"
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendContactNotification = async (messageDoc) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL, // where YOU want to receive the notification
      subject: `New portfolio message from ${messageDoc.name}`,
      text: `
New message from your portfolio:

Name: ${messageDoc.name}
Email: ${messageDoc.email}
Subject: ${messageDoc.subject}

Message:
${messageDoc.message}

Received at: ${messageDoc.createdAt}
      `,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${messageDoc.name}</p>
        <p><strong>Email:</strong> ${messageDoc.email}</p>
        <p><strong>Subject:</strong> ${messageDoc.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${messageDoc.message.replace(/\n/g, "<br/>")}</p>
        <p>Received at: ${messageDoc.createdAt}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Failed to send contact notification email:", err.message);
  }
};
