// components/PDFUpload.js
import React from 'react';

function PDFUpload({ onUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  return (
    <div className="upload-container">
      <label htmlFor="pdfUpload" className="upload-btn">Upload PDF</label>
      <input id="pdfUpload" type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
    </div>
  );
}

export default PDFUpload;
