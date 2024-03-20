import React, { useState, useRef, useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import Tesseract from "tesseract.js";

const PhotoCaptureComponent = () => {
  const videoRef = useRef(null);
//   const [photoURL, setPhotoURL] = useState(null);
    const {photoURL , setPhotoURL} = useContext(DataContext)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => {
      track.stop();
    });
  };

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const photoDataUrl = canvas.toDataURL('image/jpeg');
    setPhotoURL(photoDataUrl);
  };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={takePhoto}>Take Photo</button>
      <button onClick={stopCamera}>Stop Camera</button>
      
      <div className="camera-feed">
        <video ref={videoRef} autoPlay />
      </div>
      {photoURL && <img src={photoURL} alt="Captured" style={{ maxWidth: '300px' }} />}
    </div>
  );
};

export default PhotoCaptureComponent;
