// components/QueryInput.js
import React, { useState } from 'react';

function QueryInput({ onQuery }) {
  const [query, setQuery] = useState('');

  const handleQuerySubmit = () => {
    if (query.trim()) {
      onQuery(query);
      setQuery('');
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Type your question here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleQuerySubmit()}
        className="query-input"
      />
      <button onClick={handleQuerySubmit} className="send-btn">Send</button>
    </div>
  );
}

export default QueryInput;
