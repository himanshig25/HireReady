const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post('/analyze', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ message: 'Resume text and job description required' });
    }

    const prompt = `
You are an ATS (Applicant Tracking System) expert.

Resume:
${resumeText}

Job Description:
${jobDescription}

Analyze the resume against the job description and provide:
1. ATS Score (out of 100)
2. Missing keywords
3. Matching keywords
4. Suggestions to improve the resume

Respond ONLY in valid JSON format like this, nothing else:
{
  "atsScore": 75,
  "missingKeywords": ["React", "Node.js"],
  "matchingKeywords": ["JavaScript", "HTML"],
  "suggestions": ["Add React experience", "Mention Node.js projects"]
}
`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000
    });

    const result = JSON.parse(response.choices[0].message.content);

    res.json(result);

  } catch (error) {
    console.log('ERROR:', error.message);
    res.status(500).json({ message: 'Analysis failed', error: error.message });
  }
});

module.exports = router;