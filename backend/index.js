import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import tracker from "./middleware/tracker.js";
import setHeaders from "./middleware/setHeaders.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(tracker);
app.use(setHeaders);

// Routes

// Example: Get a user from GitHub
app.get("/api/user", (req, res) => {
  res.status(200).json({
    message: "User fetched successfully",
    image: "https://avatars.githubusercontent.com/u/46255836?v=4",
    username: "Nyumat",
    name: "Tom",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`\n\n Server running on port ${process.env.PORT} \n\n`);
});

// Connect to MongoDB (TBD)
