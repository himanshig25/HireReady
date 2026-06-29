import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await axios.post('http://localhost:5000/api/resume/upload', formData);
      setText(res.data.text);
      alert('Resume uploaded successfully!');
    } catch (error) {
      alert('Upload failed!');
    }
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      {text && <pre>{text}</pre>}
    </div>
  );
}

export default Upload;