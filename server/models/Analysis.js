const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  atsScore: {
    type: Number,
    required: true
  },
  missingKeywords: [String],
  matchingKeywords: [String],
  suggestions: [String]
}, { timestamps: true });

module.exports = mongoose.model('Analysis', analysisSchema);