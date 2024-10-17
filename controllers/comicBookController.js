import ComicBook from "../models/ComicBook.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import slugify from "slugify";

// Create a new comic book
export const createComicBook = catchAsync(async (req, res, next) => {
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
  const { page = 1, limit = 10, sort = "createdAt", ...filters } = req.query;
  const options = {
    skip: (page - 1) * limit,
    limit: parseInt(limit),
    sort: { [sort]: 1 },
  };

  const comics = await ComicBook.find(
    filters,
    { __v: 0, createdAt: 0, updatedAt: 0 },
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
  const comicBook = await ComicBook.findById(req.params.id).select("-__v");

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
