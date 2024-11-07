// components/ResponseDisplay.js
import React from 'react';
import botIcon from '../assets/Frame 1000003278 (2) 2.png'
import userIcon from '../assets/Group 4.png'

function ResponseDisplay({ response, sender }) {
  return (
    <div className={`message`}>
      <img src={sender === 'bot' ? botIcon : userIcon}  alt="icon" />
      <div className="message-content">{response}</div>
    </div>
  );
}

export default ResponseDisplay;
