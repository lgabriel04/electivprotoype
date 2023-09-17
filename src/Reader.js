// Reader.js
import React from 'react';

const Reader = ({ text }) => {
  const handleRead = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <button className="read-button" onClick={handleRead}>
      Read
    </button>
  );
};

export default Reader;
