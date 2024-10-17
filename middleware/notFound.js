import AppError from "../utils/AppError.js";

const notFound = (req, res, next) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);

  next(error);
};

export default notFound;
