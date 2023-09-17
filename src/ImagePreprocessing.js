// ImagePreprocessing.js
import React from 'react';

const ImagePreprocessing = ({ imageSrc, onPreprocessedImage }) => {
  // ma resize yang image pero ma maintain gihapon yang aspect ratio
  const resizeImage = (image, maxWidth) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const aspectRatio = image.width / image.height;
    const newWidth = maxWidth;
    const newHeight = maxWidth / aspectRatio;

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.drawImage(image, 0, 0, newWidth, newHeight);

    return canvas.toDataURL('image/jpeg');
  };

  // Apply thresholding to convert the image to binary
  const applyThreshold = (imageData, threshold) => {
    const binaryImageData = new ImageData(imageData.width, imageData.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
      const average = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;

      if (average >= threshold) {
        binaryImageData.data[i] = 255; // R
        binaryImageData.data[i + 1] = 255; // G
        binaryImageData.data[i + 2] = 255; // B
      } else {
        binaryImageData.data[i] = 0; // R
        binaryImageData.data[i + 1] = 0; // G
        binaryImageData.data[i + 2] = 0; // B
      }

      binaryImageData.data[i + 3] = 255; // Alpha
    }

    return binaryImageData;
  };

  // Preprocess the image and apply thresholding
  const preprocessImage = () => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const resizedImageSrc = resizeImage(image, 400); // Resize to a width of 400px
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.src = resizedImageSrc;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Apply thresholding (adjust threshold value as needed)
        const thresholdedData = applyThreshold(imageData, 128); // Threshold value: 128

        canvas.width = thresholdedData.width;
        canvas.height = thresholdedData.height;
        ctx.putImageData(thresholdedData, 0, 0);

        // Convert the processed image to a data URL
        const processedImageSrc = canvas.toDataURL('image/jpeg');

        // Pass the processed image back to the parent component
        onPreprocessedImage(processedImageSrc);
      };
    };
  };

  return (
    <div>
      <button onClick={preprocessImage}>Preprocess Image</button>
    </div>
  );
};

export default ImagePreprocessing;
