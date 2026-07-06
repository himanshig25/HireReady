const express = require('express');
const router = express.Router();
const multer = require('multer');
const { PdfReader } = require('pdfreader');
const mammoth = require('mammoth');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    console.log('File received:', req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileExt = path.extname(req.file.originalname).toLowerCase();
    let extractedText = '';

    if (fileExt === '.pdf') {
      extractedText = await new Promise((resolve, reject) => {
        let text = '';
        new PdfReader().parseBuffer(req.file.buffer, (err, item) => {
          if (err) reject(err);
          else if (!item) resolve(text);
          else if (item.text) text += item.text + ' ';
        });
      });
    } else if (fileExt === '.docx') {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      extractedText = result.value;
    }

    res.json({
      message: 'Resume uploaded successfully',
      text: extractedText
    });

  } catch (error) {
    console.log('ERROR:', error.message);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

module.exports = router;