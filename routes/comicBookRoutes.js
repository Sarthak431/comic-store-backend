import express from "express";
import {
  createComicBook,
  getComicBooks,
  getComicBookById,
  getComicBookBySlug,
  updateComicBook,
  deleteComicBook,
} from "../controllers/comicBookController.js";

const router = express.Router();

// Routes for creating a comic book and getting all comic books (with filtering, sorting, pagination)
router.route("/").post(createComicBook).get(getComicBooks);

// Routes for fetching, updating, and deleting a comic book by its ID
router
  .route("/:id")
  .get(getComicBookById)
  .patch(updateComicBook)
  .delete(deleteComicBook);

// Route for fetching a comic book by its slug (instead of ID)
router.route("/slug/:slug").get(getComicBookBySlug);

export default router;
