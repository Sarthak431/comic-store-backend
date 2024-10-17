import ComicBook from "../models/ComicBook.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import slugify from 'slugify';


export const createComicBook = catchAsync(async (req, res, next) => {
  // Check if a comic book with the same slug already exists
  const existingComicBook = await ComicBook.findOne({ slug: slugify(req.body.name, { lower: true }) });
  if (existingComicBook) {
    return next(new AppError('Slug must be unique. This slug is already in use.', 400));
  }

  // Create a new comic book instance with the request body data
  const comicBook = new ComicBook(req.body);

  // Save the comic book to the database
  await comicBook.save();

  // Send a response with the created comic book
  res.status(201).json({
    success: true,
    data: comicBook
  });
});

// Get All Comic Books (with filtering, pagination, and sorting)
export const getComicBooks = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, sort = "createdAt", ...filters } = req.query;
  const options = {
    skip: (page - 1) * limit,
    limit: parseInt(limit),
    sort: { [sort]: 1 }, // Default to ascending order
  };

  const comics = await ComicBook.find(filters, null, options).select("-__v -createdAt -updatedAt");
  const total = await ComicBook.countDocuments(filters);

  res.status(200).json({
    success: true,
    totalItems: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: comics
  });
});

// Get Comic Book by ID
export const getComicBookById = catchAsync(async (req, res, next) => {
  const comicBook = await ComicBook.findById(req.params.id).select("-__v");

  if (!comicBook) {
    return next(new AppError("Comic Book not found", 404));
  }

  res.status(200).json({
    success: true,
    data: comicBook
  });
});

// Update a Comic Book
export const updateComicBook = catchAsync(async (req, res, next) => {
  // Find the comic book by ID
  const comicBook = await ComicBook.findById(req.params.id);

  // Check if the comic book exists
  if (!comicBook) {
    return next(new AppError("Comic Book not found", 404));
  }

  // Update the comic book fields with the new data from req.body
  Object.keys(req.body).forEach((key) => {
    comicBook[key] = req.body[key];
  });

  // Save the updated comic book
  await comicBook.save();

  res.status(200).json({
    success: true,
    data: comicBook,
  });
});

// Delete a Comic Book
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
