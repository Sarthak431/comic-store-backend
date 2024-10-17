import AppError from '../utils/AppError.js'; // Adjust the import path as necessary

const notFound = (req, res, next) => {
  // Create a new instance of AppError for not found
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  
  // Pass the error to the next middleware (error handler)
  next(error);
};

export default notFound;
