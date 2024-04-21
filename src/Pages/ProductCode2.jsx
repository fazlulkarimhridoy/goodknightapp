import React, { useEffect, useRef, useState } from 'react';
import '../CSS/productcode.css' // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';
import toast from 'react-hot-toast';
import { Spin } from 'antd';
import { motion } from "framer-motion"


function ProductCode2() {
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        startCamera();
    }, []); // Run once on component mount

    const startCamera = async () => {
        const videoElement = videoRef.current;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
        } catch (error) {
            console.error('Error accessing the camera: ', error);
        }
    };

    const handleDetectedText = async (img) => {
        const { data: { text } } = await Tesseract.recognize(
            img,
            'eng', // language
            { logger: m => console.log(m) },
            {
                minConfidence: 0.5,
                psm: 3,
                oem: 1,
                tessedit_pageseg_mode: 3, // Fully automatic page segmentation, but no OSD
                tessedit_char_whitelist: '0123456789', // Only recognize digits
                tessedit_image_quality: 10, // Adjust image quality
                tessedit_create_tsv: 1, // Output in TSV format
                tessedit_create_hocr: 0, // Output in hOCR format (set to 0 to disable)
                tessedit_create_pdf: 0, // Output in PDF format (set to 0 to disable)
                tessedit_create_unlv: 0, // Output in UNLV format (set to 0 to disable)
                tessedit_create_boxfile: 0, // Output bounding box coordinates (set to 0 to disable)
                tessedit_char_blacklist: '', // No characters to blacklist
                tessedit_enable_doc_dict: 1, // Use dictionary of words found in the document
                tessedit_enable_bigram_correction: 1, // Use bigram correction
            },
        );
        return text;
    }

    const capturePhoto = async () => {
        setLoading(true);

        try {
            const videoElement = videoRef.current;
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/png');

            // Decode the data URL
            const imageDataUrl = dataURL;
            const byteString = atob(imageDataUrl.split(",")[1]);
            const mimeString = imageDataUrl.split(",")[0].split(":")[1].split(";")[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // Create a Blob object
            const blob = new Blob([ab], { type: mimeString });
            const webPath = URL.createObjectURL(blob);
            const result = await handleDetectedText(webPath);
            const resultNumber = parseInt(result);
            console.log("resultNumber", resultNumber);
            if (!isNaN(resultNumber)) {
                setLoading(false)
                localStorage.setItem('productCode2', resultNumber);
                navigate("/takeImage");
            }
            else {
                setLoading(false);
                toast.error("No code found. Please try again")
            }
        } catch (error) {
            setLoading(false);
            toast.error('Error capturing image', error);
        }

    };

    return (
        <div className="relative camera-container">
            <video id="camera-preview" ref={videoRef} autoPlay muted></video>
            <div className="cutout-overlay"></div>
            <motion.button className="absolute left-[20%] bottom-[50%] w-[60%] flex gap-10 bg-gray-200 px-5 py-1.5 rounded-md" onClick={capturePhoto}>
                Capture Photo
                <div>
                    {
                        loading ? <Spin
                            size="small"
                        /> : <></>
                    }
                </div>
            </motion.button>
        </div>
    );
}

export default ProductCode2;
