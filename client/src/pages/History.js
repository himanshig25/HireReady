import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
       const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/analyze/history`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setAnalyses(res.data);
      } catch (error) {
        console.log('Error fetching history');
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">Analysis History</h2>

          {loading && <p className="text-center text-gray-500">Loading...</p>}

          {!loading && analyses.length === 0 && (
            <p className="text-center text-gray-500">No analyses yet. Go optimize your resume!</p>
          )}

          {analyses.map((a, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-blue-600">{a.atsScore}/100</span>
                <span className="text-xs text-gray-400">
                  {new Date(a.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{a.jobDescription}</p>
              <div className="flex flex-wrap gap-2">
                {a.matchingKeywords.map((k, j) => (
                  <span key={j} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-200">{k}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default History;