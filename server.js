import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const question = req.body.question;

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_KEY,
    {
      contents: [{ parts: [{ text: question }] }]
    }
  );

  res.json({
    answer: response.data.candidates[0].content.parts[0].text
  });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
