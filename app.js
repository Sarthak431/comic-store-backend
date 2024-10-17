import express from "express";
import comicBookRoutes from "./routes/comicBookRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import catchAsync from "./utils/catchAsync.js";

const app = express();

if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev")); // 'dev' format provides concise output with response status and time
}

app.use(express.json());

app.get(
  "/health",
  catchAsync(async (req, res) => {
    res.json({ status: "OK", serverTime: new Date().toISOString() });
  })
);

app.use("/api/v1/comicBooks", comicBookRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
