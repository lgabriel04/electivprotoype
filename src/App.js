import React, { useState } from 'react';
import './general.css';
import MemeDisplay from './MemeDisplay';
import ScannerCamera from './ScannerCamer';

const App = () => {
  const [scannedText, setScannedText] = useState('');
  const [showMemes, setShowMemes] = useState(false);

  const handleTextRecognized = (text) => {
    setScannedText(text);
  };

  const handleRead = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(scannedText);

    // pang adjust sang volume
    utterance.volume = 10.0; // Set it to 1.0 for full volume

    synth.speak(utterance);
  };

  return (
    <div className="App">
      <nav className="navbar" style={{ backgroundColor: '#4360ED' }}>
        <div className="navbar-title">FR - For Read</div>
        <div className="navbar-buttons">
          <button className="navbar-button">Home</button>
          <button
            className="navbar-button"
            onClick={() => setShowMemes(!showMemes)}
          >
            I'm Bored
          </button>
        </div>
      </nav>
      <div className="scanner-container">
        <ScannerCamera onTextRecognized={handleTextRecognized} />
        <textarea
          className="text-box"
          placeholder="Scanned Text"
          value={scannedText}
          onChange={(e) => setScannedText(e.target.value)}
        ></textarea>
        <button className="read-button" onClick={handleRead}>
          Read
        </button>
      </div>
      {showMemes && <MemeDisplay />}
    </div>
  );
};

export default App;
