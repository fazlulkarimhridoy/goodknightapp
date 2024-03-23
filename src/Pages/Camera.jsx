import React, { useRef } from 'react';

const CameraComponent = () => {
  const videoRef = useRef(null);

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

  return (
    <div>
    <h2>Camera Component</h2>
    <button onClick={startCamera}>Start Camera</button>
    <button onClick={stopCamera}>Stop Camera</button>
    <div className="camera-feed">
      <video ref={videoRef} autoPlay />
    </div>
  </div>
  );
};

export default CameraComponent;
