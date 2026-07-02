const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const Analysis = require('../models/Analysis');
const jwt = require('jsonwebtoken');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const getUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/analyze', getUser, async (req, res) => {
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

    const analysis = new Analysis({
      userId: req.userId,
      jobDescription,
      atsScore: result.atsScore,
      missingKeywords: result.missingKeywords,
      matchingKeywords: result.matchingKeywords,
      suggestions: result.suggestions
    });
    await analysis.save();

    res.json(result);

  } catch (error) {
    console.log('ERROR:', error.message);
    res.status(500).json({ message: 'Analysis failed', error: error.message });
  }
});

router.get('/history', getUser, async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

module.exports = router;