import React, { useState, useEffect, useRef } from 'react';
import Tesseract from 'tesseract.js';

const ScannerCamera = ({ onTextRecognized }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    enableCamera();

    return () => {
      // mag stop yang camera pag yang component
      const stream = video.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    // para mag play lang yang camera on the screen 
    if (video.paused) {
      video.play().then(() => {
        captureImage(video);
      });
    } else {
      captureImage(video);
    }
  };

  const captureImage = (video) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    setCapturedImage(canvas.toDataURL('image/png'));
  };

  const handleScan = () => {
    if (!capturedImage) {
      alert('Please capture an image first.');
      return;
    }

    Tesseract.recognize(capturedImage, 'eng', { logger: (info) => console.log(info) })
      .then(({ data: { text } }) => {
        onTextRecognized(text);
      })
      .catch((error) => {
        console.error('Error during text recognition:', error);
      });
  };

  return (
    <div className="scanner-camera">
      <video ref={videoRef} autoPlay playsInline className="camera-feed"></video>
      <button className="capture-button" onClick={handleCapture}>
        Capture
      </button>
      {capturedImage && (
        <>
          <img
            className="captured-image"
            src={capturedImage}
            alt="Captured"
          />
          <button className="scan-button" onClick={handleScan}>
            Scan
          </button>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ScannerCamera;
