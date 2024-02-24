const express = require("express");
const dotenv = require("dotenv");
const { translate } = require("@vitalets/google-translate-api");


//configure env 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware to parse JSON request body
app.use(express.json());

// POST endpoint for translation
app.post("/translate", async (req, res) => {
  try {
    // Check if request body contains 'text' key
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({
          error:
            'Invalid request. Please provide a valid "text" field in the request body.',
        });
    }

    // Translate text from English to French
    const translation = await translate(text, { to: "fr" });

    // Respond with translated text
    res.status(200).json({ translation: translation.text });
  } catch (error) {
    console.error("Translation error:", error);
    // Handle translation errors
    res
      .status(500)
      .json({
        error: "Error occurred during translation. Please try again later.",
      });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
