import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import tracker from "./middleware/tracker.js";
import setHeaders from "./middleware/setHeaders.js";
import os from "os";
import { OpenAIApi, Configuration } from "openai";

dotenv.config();
const app = express();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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


app.get("/api/ai", async (req, res) => {
  let query = req.query.query;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Human: ${query}`,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });

  // console.log(response.data.choices[0].text);
  console.log(response.data)
  res.status(200).json({
    status: "AI fetched successfully",
    text: response.data.choices[0].text,
    agent: "AI",
  });
})


app.listen(process.env.PORT, () => {
  console.log(`\n\n Server running on port ${process.env.PORT} \n\n`);
});

// Connect to MongoDB (TBD)
