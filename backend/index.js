import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Main route
app.get("/", (req, res) => {
      res.status(200).json({ data: "Hello Worldd" });
});

app.listen(process.env.PORT, () => {
      console.log(`\n\n Server running on port ${process.env.PORT} \n\n`);
});
// Connect to MongoDB (TBD)
