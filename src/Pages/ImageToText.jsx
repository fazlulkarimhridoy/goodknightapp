import React, { useContext, useEffect, useState } from "react";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import Logo from "../components/Logo";
import Button from "../components/Button";
import Tesseract from "tesseract.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { DataContext } from "../context/DataProvider";
import { motion } from "framer-motion"
import { Geolocation } from "@capacitor/geolocation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Spin } from "antd";
import "../CSS/imagetotext.css"
import { Network } from '@capacitor/network';
import { Ocr } from '@capacitor-community/image-to-text';



const ImageToText = () => {
  const [loading, setLoading] = useState(false);
  const [detectedText1, setDetectedText1] = useState(null);
  const [detectedText2, setDetectedText2] = useState(null);
  const navigate = useNavigate();

  const { setCustomerData, customerData, removeData } = useContext(DataContext);
  const { quantity } = customerData;

  // checking if token is valid
  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = "/signin";
  }

  // useEffect for location
  useEffect(() => {
    const getLocation = async () => {
      const position = await Geolocation?.getCurrentPosition();
      const latitude = position?.coords?.latitude.toString();
      const longitude = position?.coords?.longitude.toString();
      setCustomerData({ ...customerData, latitude: latitude, longitude: longitude, product_code1: parseInt(detectedText1), product_code2: parseInt(detectedText2), interested: "yes" });
    }
    getLocation();
  }, []);

  // handle manual input code1
  const handleManualInput1 = (e) => {
    const updatedValue = e.target.value;
    setDetectedText1(updatedValue);
    setCustomerData((prevData) => ({
      ...prevData,
      product_code1: updatedValue,
    }));
  };

  // handle manual input code2
  const handleManualInput2 = (e) => {
    const updatedValue = e.target.value;
    setDetectedText2(updatedValue);
    setCustomerData((prevData) => ({
      ...prevData,
      product_code2: updatedValue,
    }));
  };



  // mutation post request
  const customerInfoMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("https://expactivation.app/api/store-customer-info", customerData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    },
    onSuccess: (data) => {
      setLoading(false)
      removeData();
      navigate("/successPage")
      toast.success("Customer Information successfully stored")
    },
    onError: (error) => {
      setLoading(false)
      if (error.response.status === 422) {
        toast.error("Missing Customer Information")
      };
    }
  });


  const handleSubmit = async () => {
    setLoading(true);
    const status = await Network.getStatus();
    if (status.connected) {
      customerInfoMutation.mutate();
    }
    else {
      setLoading(false);
      toast.error("Please check your internet connection")
    }
  }

  // handle product code 1
  const handleProductCode1 = async () => {
    setLoading(true);
    try {
      // Capture photo
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
      // ocr with capacitor plugin
      const data = await Ocr.detectText({ filename: photo.path });
      // extracting ocr output
      for (let detection of data.textDetections) {
        const ocrTextNumber = parseInt(detection.text);
        // if not number then proceed for result
        if (!isNaN(ocrTextNumber)) {
          setLoading(false);
          setDetectedText1(ocrTextNumber);
          setCustomerData((prevData) => ({
            ...prevData,
            product_code1: ocrTextNumber,
          }));
        } else {
          setLoading(false);
          toast.error("No code found. Please try again");
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error('Error capturing image', error);
    }
  }

  // handle product code 2
  const handleProductCode2 = async () => {
    setLoading(true);
    try {
      // Capture photo
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
      // ocr with capacitor plugin
      const data = await Ocr.detectText({ filename: photo.path });
      // extracting ocr output
      for (let detection of data.textDetections) {
        const ocrTextNumber = parseInt(detection.text);
        // if not number then proceed for result
        if (!isNaN(ocrTextNumber)) {
          setLoading(false);
          setDetectedText2(ocrTextNumber);
          setCustomerData((prevData) => ({
            ...prevData,
            product_code2: ocrTextNumber,
          }));
        } else {
          setLoading(false);
          toast.error("No code found. Please try again");
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error('Error capturing image', error);
    }
  }




  return (
    <motion.div initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      exit={{ x: -400, ease: "easeInOut" }}>
      <Navbar></Navbar>
      <div className="container font-poppins">
        <section className="flex flex-col justify-center items-center gap-4">

          <div className="pr-12 relative">
            <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
          </div>
          <p className="text-2xl text-white mt-20">Give Product Code</p>

          <div className="flex flex-col gap-4 px-2 mt-2">

            {
              quantity === 2 ?
                <>
                  {/* product 01 */}
                  <div className=" flex  space-x-5 ">
                    <input
                      name="code1"
                      onChange={handleManualInput1}
                      className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-xl font-bold rounded-xl outline-none"
                      value={detectedText1 || null}
                      type="number" />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleProductCode1}
                      className="bg-[#D9D9D9] px-4 py-2 rounded-lg"
                    >
                      <img src="/images/cameraIcon.svg"></img>
                    </motion.button>
                  </div>

                  {/* product 02 */}
                  <div className=" flex  space-x-5">
                    <input
                      name="code1"
                      onChange={handleManualInput2}
                      className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-xl font-bold rounded-xl outline-none"
                      value={detectedText2 || null}
                      type="number" />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleProductCode2}
                      className="bg-[#D9D9D9] px-4 py-2 rounded-lg"
                    >
                      <img src="/images/cameraIcon.svg"></img>
                    </motion.button>
                  </div>
                </>
                :
                <>
                  {/* product 01 */}
                  <div className=" flex  space-x-5 ">
                    <input
                      name="code1"
                      onChange={handleManualInput1}
                      className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-xl font-bold rounded-xl outline-none"
                      value={detectedText1 || null}
                      type="number" />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleProductCode1}
                      className="bg-[#D9D9D9] px-4 py-2 rounded-lg"
                    >
                      <img src="/images/cameraIcon.svg"></img>
                    </motion.button>
                  </div>
                </>
            }

          </div>
          <div className="mt-4">
            {
              loading ? <Spin
                size="small"
              /> : <></>
            }
          </div>
          <div onClick={handleSubmit} className={`${loading ? "mt-28" : "mt-32"}`}>
            <Button title={"SUBMIT"}></Button>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ImageToText;
