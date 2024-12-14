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

// Security middleware to set various HTTP headers for security
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS) for all requests
app.use(cors());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Use morgan for logging HTTP requests only in development mode
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}

// Parse incoming JSON payloads
app.use(express.json());

// Health check route to ensure server is running and responsive
app.get(
  "/health",
  catchAsync(async (req, res) => {
    res.json({ status: "OK", serverTime: new Date().toISOString() });
  })
);

// Comic books API routes
app.use("/api/v1/comicBooks", comicBookRoutes);

// Handle 404 errors for unknown routes
app.use(notFound);

// Centralized error handling middleware
app.use(errorHandler);

export default app;
