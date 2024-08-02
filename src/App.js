import React, { useState, useEffect } from 'react';
import QRCodeLib from 'qrcode'; // Import the qrcode library
import QRCode from 'qrcode.react'; // Import QRCode component
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

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
    setUrl(e.target.value);
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
        placeholder="Enter URL here"
        value={url}
        onChange={handleInputChange}
      />
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
