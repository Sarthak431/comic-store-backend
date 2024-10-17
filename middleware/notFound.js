import AppError from "../utils/AppError.js";

const notFound = (req, res, next) => {
  // Create a new AppError when the requested route is not found
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);

  next(error); // Pass the error to the next middleware (error handler)
};

export default notFound;
