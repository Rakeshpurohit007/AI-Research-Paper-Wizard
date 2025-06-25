const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'https://airesearchpaper.tiiny.site' }));
app.use(bodyParser.json());

app.post('/api/generate', async (req, res) => {
  const userPrompt = req.body.prompt;
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: userPrompt }] }] })
  });

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  res.json({ result: reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));