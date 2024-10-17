import express from "express";
import comicBookRoutes from "./routes/comicBookRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import catchAsync from "./utils/catchAsync.js";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(cors());
app.use(hpp());

if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
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
