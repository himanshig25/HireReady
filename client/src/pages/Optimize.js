import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Optimize() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/resume/upload`, formData);
      setResumeText(res.data.text);
      alert('Resume uploaded and text extracted!');
    } catch (error) {
      alert('Upload failed!');
    }
    setUploading(false);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setAnalyzing(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/analyze/analyze`, {
        resumeText,
        jobDescription
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data);
    } catch (error) {
      alert('Analysis failed!');
    }
    setAnalyzing(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">Optimize Your Resume</h2>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Step 1: Upload Resume</h3>
            <form onSubmit={handleFileUpload} className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                className="flex-1 text-sm text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="submit"
                disabled={uploading}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </form>
          </div>

          {resumeText && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Step 2: Paste Job Description</h3>
              <textarea
                placeholder="Paste job description here..."
                rows={6}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </div>
          )}

          {result && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E6F1FB" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#378ADD" strokeWidth="3"
                      strokeDasharray={`${result.atsScore} 100`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-blue-800">{result.atsScore}</span>
                    <span className="text-xs text-gray-400">/100</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-1">
                    {result.atsScore >= 80 ? '🎉 Great Match!' : result.atsScore >= 60 ? '👍 Good Match!' : '⚠️ Needs Work'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {result.atsScore >= 80 ? 'Your resume matches most requirements!' : result.atsScore >= 60 ? 'Fix missing keywords to improve your chances.' : 'Add more relevant keywords to your resume.'}
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="text-sm font-semibold text-red-600 mb-2">❌ Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.length === 0
                    ? <span className="text-sm text-gray-400">None — great job!</span>
                    : result.missingKeywords.map((k, i) => (
                      <span key={i} className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full border border-red-200">{k}</span>
                    ))}
                </div>
              </div>

              <div className="mb-5">
                <h4 className="text-sm font-semibold text-green-600 mb-2">✅ Matching Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {result.matchingKeywords.map((k, i) => (
                    <span key={i} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-200">{k}</span>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Suggestions</h4>
                <div className="flex flex-col gap-2">
                  {result.suggestions.map((s, i) => (
                    <div key={i} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-blue-500 flex-shrink-0">→</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Optimize Again →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Optimize;