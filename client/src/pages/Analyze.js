import React, { useState } from 'react';
import axios from 'axios';

function Analyze() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/analyze/analyze', {
        resumeText,
        jobDescription
      });
      setResult(res.data);
    } catch (error) {
      alert('Analysis failed!');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Analyze Resume</h2>
      <form onSubmit={handleAnalyze}>
        <textarea
          placeholder="Paste your resume text here..."
          rows={10}
          onChange={(e) => setResumeText(e.target.value)}
        /><br/>
        <textarea
          placeholder="Paste job description here..."
          rows={10}
          onChange={(e) => setJobDescription(e.target.value)}
        /><br/>
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {result && (
        <div>
          <h3>ATS Score: {result.atsScore}/100</h3>
          <h4>Missing Keywords:</h4>
          <ul>
            {result.missingKeywords.map((k, i) => <li key={i}>{k}</li>)}
          </ul>
          <h4>Matching Keywords:</h4>
          <ul>
            {result.matchingKeywords.map((k, i) => <li key={i}>{k}</li>)}
          </ul>
          <h4>Suggestions:</h4>
          <ul>
            {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Analyze;