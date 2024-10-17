import ComicBook from "../models/ComicBook.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import slugify from "slugify";

// Create a new comic book
export const createComicBook = catchAsync(async (req, res, next) => {
  // Check if a comic book with the same slug already exists
  const existingComicBook = await ComicBook.findOne({
    slug: slugify(req.body.name, { lower: true }),
  });
  if (existingComicBook) {
    return next(
      new AppError("Slug must be unique. This slug is already in use.", 400)
    );
  }

  const comicBook = new ComicBook(req.body);
  await comicBook.save();

  res.status(201).json({
    success: true,
    data: comicBook,
  });
});

// Get all comic books with pagination and filtering
export const getComicBooks = catchAsync(async (req, res, next) => {
  // Destructure and set default values for pagination and sorting
  const { page = 1, limit = 10, sort = "createdAt", ...filters } = req.query;
  const options = {
    skip: (page - 1) * limit, // Skip documents for pagination
    limit: parseInt(limit),
    sort: { [sort]: 1 }, // Sort by the specified field (default: createdAt)
  };

  const comics = await ComicBook.find(
    filters,
    { __v: 0, createdAt: 0, updatedAt: 0 }, // Exclude these fields from results
    options
  );

  const total = await ComicBook.countDocuments(filters);

  res.status(200).json({
    success: true,
    totalItems: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: comics,
  });
});

// Get a comic book by ID
export const getComicBookById = catchAsync(async (req, res, next) => {
  const comicBook = await ComicBook.findById(req.params.id).select("-__v"); // Exclude __v field

  if (!comicBook) {
    return next(new AppError("Comic Book not found", 404));
  }

  res.status(200).json({
    success: true,
    data: comicBook,
  });
});

// Get a comic book by slug
export const getComicBookBySlug = catchAsync(async (req, res, next) => {
  const comicBook = await ComicBook.findOne({ slug: req.params.slug }).select("-__v");

  if (!comicBook) {
    return next(new AppError("Comic Book not found", 404));
  }

  res.status(200).json({
    success: true,
    data: comicBook,
  });
});

// Update a comic book
export const updateComicBook = catchAsync(async (req, res, next) => {
  const comicBook = await ComicBook.findById(req.params.id);

  if (!comicBook) {
    return next(new AppError("Comic Book not found", 404));
  }

  // Update comic book fields with new data from the request body
  Object.keys(req.body).forEach((key) => {
    comicBook[key] = req.body[key];
  });

  await comicBook.save();

  res.status(200).json({
    success: true,
    data: comicBook,
  });
});

// Delete a comic book
export const deleteComicBook = catchAsync(async (req, res, next) => {
  const comicBook = await ComicBook.findByIdAndDelete(req.params.id);

  if (!comicBook) {
    return next(new AppError("Comic Book not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Comic Book deleted successfully",
  });
});
