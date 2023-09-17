// MemeDisplay.js poang iagafaafnafnakfna potang ina 
import React, { useState } from 'react';
import meme1 from './meme1.jpg';
import meme3 from './meme3.jpg';
import meme4 from './meme4.jpg';
import meme5 from './meme (1).jpg';
import meme6 from './meme (2).jpg';
import meme7 from './meme (3).jpg';
import meme8 from './meme (4).jpg';
import meme9 from './meme (5).jpg';
import meme10 from './meme (6).jpg';
import meme11 from './meme (7).jpg';
import meme12 from './meme (8).jpg';
import meme13 from './meme (9).jpg';
import meme14 from './meme (10).jpg';
import meme15 from './meme (11).jpg';

const MemeDisplay = () => {
  const [randomImageIndex, setRandomImageIndex] = useState(0);

  const memeImages = [
    meme1,
    meme3,
    meme4,
    meme5,
    meme6,
    meme7,
    meme8,
    meme9,
    meme10,
    meme11,
    meme12,
    meme13,
    meme14,
    meme15,
  ];

  const getRandomMeme = () => {
    const newIndex = Math.floor(Math.random() * memeImages.length);
    setRandomImageIndex(newIndex);
  };

  return (
    <div className="meme-container">
      <button className="meme-button" onClick={getRandomMeme}>
        Get a Meme
      </button>
      <img
        src={memeImages[randomImageIndex]}
        alt="Random Meme"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default MemeDisplay;
