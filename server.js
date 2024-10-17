import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

// Handle uncaught exceptions (synchronous errors) and shut down the server gracefully
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1); // Exit the process after handling the exception
});

connectDB(); // Connect to the database

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

// Handle unhandled promise rejections and shut down the server gracefully
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // Gracefully close the server before shutting down
  });
});
