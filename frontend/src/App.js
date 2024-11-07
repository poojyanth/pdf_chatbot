// App.js
import React, { useState } from 'react';
import PDFUpload from './components/PDFUpload';
import QueryInput from './components/QueryInput';
import ResponseDisplay from './components/ResponseDisplay';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState([{ sender: "bot", text: "Please upload a PDF to start conversing" }]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    setPdfFile(file);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadResponse = await fetch('http://localhost:8000/upload_pdf', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload PDF');
      }

      // Update chat with confirmation message
      setMessages([...messages, { sender: "bot", text: "PDF uploaded successfully! Ask your question." }]);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert(error.message);
    }
  };

  const handleQuery = async (query) => {
    if (!pdfFile) {
      alert('Please upload a PDF first.');
      return;
    }

    setMessages([...messages, { sender: "user", text: query }]);
    setLoading(true);

    try {
      const queryResponse = await fetch(`http://localhost:8000/query?query=${encodeURIComponent(query)}`);

      if (!queryResponse.ok) {
        throw new Error('Failed to query PDF');
      }

      const data = await queryResponse.json();
      setResponse(data.response);
      
      // Update chat with bot response
      setMessages([...messages, { sender: "user", text: query }, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.error('Error querying PDF:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <NavBar onUpload={handleUpload}/>
      <div className="response-window">
        <div className="chat-window">
          {messages.map((msg, index) => (
            <ResponseDisplay key={index} response={msg.text} sender={msg.sender} />
          ))}
          {loading && <div className="loader">Thinking...</div>}
        </div>
        <QueryInput onQuery={handleQuery} />
      </div>
    </div>
  );
}

export default App;
