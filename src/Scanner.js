// Scanner.js
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Reader from './Reader';

const Scanner = () => {
  const [scannedText, setScannedText] = useState('');

  const handleScan = () => {
    Tesseract.recognize(
      // Your image source here
      'path_to_image.png',
      'eng', // Language code (English in this case)
      { logger: (info) => console.log(info) } // Optional logger
    ).then(({ data: { text } }) => {
      setScannedText(text);
    });
  };

  return (
    <div className="scanner-container">
      <button className="scan-button" onClick={handleScan}>
        Scan
      </button>
      <textarea
        className="text-box"
        placeholder="Scanned Text"
        value={scannedText}
        onChange={(e) => setScannedText(e.target.value)}
      ></textarea>
      <Reader text={scannedText} />
    </div>
  );
};

export default Scanner;
