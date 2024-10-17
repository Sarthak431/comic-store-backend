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

router.route("/").post(createComicBook).get(getComicBooks);

router
  .route("/:id")
  .get(getComicBookById)
  .patch(updateComicBook)
  .delete(deleteComicBook);

router.route("/slug/:slug").get(getComicBookBySlug);

export default router;
