// src/App.js
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter URL here"
        value={url}
        onChange={handleInputChange}
      />
      {url && (
        <div>
          <h2>QR Code:</h2>
          <QRCode value={url} />
        </div>
      )}
    </div>
  );
}

export default App;
