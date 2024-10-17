import express from "express";
import comicBookRoutes from "./routes/comicBookRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import catchAsync from "./utils/catchAsync.js";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";

const app = express();


// Security measures
app.use(helmet());
app.use(cors());
app.use(hpp());

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
