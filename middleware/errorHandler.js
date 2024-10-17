const errorHandler = (err, req, res, next) => {
  // Set default status code to 500 (internal server error) if not provided
  err.statusCode = err.statusCode || 500;

  // Set default status to "error" if not provided
  err.status = err.status || "error";

  // Return error response with status code, message, and stack trace (only in development)
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === "DEVELOPMENT" ? err.stack : undefined, // Show stack trace only in development
  });
};

export default errorHandler;
