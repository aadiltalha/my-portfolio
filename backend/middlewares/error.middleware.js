export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err);

  // Multer image filter error
  if (err instanceof Error && err.message.includes("Only")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};
