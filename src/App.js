import React, { useState, useEffect } from 'react';
import QRCodeLib from 'qrcode'; // Import the qrcode library
import QRCode from 'qrcode.react'; // Import QRCode component
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [timer, setTimer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (url) {
      QRCodeLib.toDataURL(url)
        .then((dataUrl) => {
          setQrCodeUrl(dataUrl);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setQrCodeUrl('');
    }
  }, [url]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (timer) {
      clearTimeout(timer);
    }

    if (value.includes('.')) {
      const newTimer = setTimeout(() => {
        if (value.includes('.com') || value.includes('.net') || value.includes('.org')) {
          setUrl(value);
          setError('');
        } else {
          setError('Invalid URL');
        }
      }, 1000);
      setTimer(newTimer);
    }
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const sanitizedFilename = url
        .replace(/[^a-zA-Z0-9]/g, '_') // Replace non-alphanumeric characters with underscores
        .slice(0, 50); // Limit filename length to 50 characters
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `${sanitizedFilename}.png`; // Use sanitized URL as filename
      link.click();
    }
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="URL here ex: google.com"
        value={inputValue}
        onChange={handleInputChange}
      />
      {error && <p className="error">{error}</p>}
      {qrCodeUrl && (
        <div>
          <h2>QR Code:</h2>
          <QRCode value={url} size={256} /> {/* Adjusted size */}
          <div>
            <button onClick={handleDownload} className="download-button">Download QR Code</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
