const errorHandler = (err, req, res, next) => {
  // Return error response with status code, message, and stack trace (only in development)
  res.status(err.statusCode || 500).json({
    success: false,
    status: err.status || "error",
    message: err.message,
    stack: process.env.NODE_ENV === "DEVELOPMENT" ? err.stack : undefined, // Show stack trace only in development
  });
};

export default errorHandler;
