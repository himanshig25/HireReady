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
      const res = await axios.post('http://localhost:5000/api/resume/upload', formData);
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
      const res = await axios.post('http://localhost:5000/api/analyze/analyze', {
        resumeText,
        jobDescription
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">ATS Score</p>
                <p className="text-4xl font-bold text-blue-600">{result.atsScore}/100</p>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-red-600 mb-2 text-sm">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((k, i) => (
                    <span key={i} className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full border border-red-200">{k}</span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-green-600 mb-2 text-sm">Matching Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {result.matchingKeywords.map((k, i) => (
                    <span key={i} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-200">{k}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2 text-sm">Suggestions</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Optimize;