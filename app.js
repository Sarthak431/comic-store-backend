import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.send("Hi there");
});

app.get("/health", (req, res, next) => {
  res.json({ status: "OK", serverTime: new Date().toISOString() });
});

export default app;
