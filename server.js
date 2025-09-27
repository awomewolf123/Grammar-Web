const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

app.post('/api/check-grammar', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a professional grammar and writing assistant. Analyze the provided text and return a JSON response with the following exact structure:
          {
            "correctedText": "The fully corrected version of the text",
            "issues": [
              {
                "original": "original problematic text",
                "correction": "corrected text",
                "type": "grammar|spelling|punctuation|style",
                "explanation": "Brief explanation of the issue",
                "position": "approximate position in text"
              }
            ],
            "score": 85,
            "summary": "Brief summary of issues found and improvements made"
          }
          
          Focus on: grammar errors, spelling mistakes, punctuation issues, style improvements, and clarity.
          Return ONLY valid JSON, no additional text or formatting.`
        },
        {
          role: "user",
          content: text
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.1,
      max_tokens: 1500
    });

    let result;
    try {
      result = JSON.parse(completion.choices[0]?.message?.content);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      result = {
        correctedText: text,
        issues: [],
        score: 100,
        summary: "Analysis completed, but formatting error occurred."
      };
    }

    res.json(result);

  } catch (error) {
    console.error('Error checking grammar:', error);
    res.status(500).json({ 
      error: 'Failed to check grammar',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Grammar Checker with Groq API'
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Make sure to set your GROQ_API_KEY in the .env file');
  console.log('Get your free API key at: https://console.groq.com/keys');
});