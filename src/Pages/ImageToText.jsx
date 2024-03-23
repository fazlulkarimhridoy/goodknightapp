import React, { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Ocr } from '@capacitor-community/image-to-text';

const ImageToText = () => {
    const [detectedText, setDetectedText] = useState('');

    const captureImageAndRecognizeText = async () => {
        try {
            const photo = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera
            });

            const textDetections = await Ocr.detectText({ filename: photo.path });

            let text = '';
            for (let detection of textDetections.textDetections) {
                text += detection.text + '\n';
            }
            setDetectedText(text);
        } catch (error) {
            console.error('Error processing image:', error);
        }
    };

    return (
        <div>
            <button onClick={captureImageAndRecognizeText}>Capture Image</button>
            <div>
                <h2>Detected Text:</h2>
                <p>{detectedText}</p>
            </div>
        </div>
    );
};

export default ImageToText;
