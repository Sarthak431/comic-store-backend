class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    
    // Set the status code and determine the error type based on the code
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    
    // Mark this error as operational (handled gracefully)
    this.isOperational = true;

    // Capture the stack trace excluding the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
