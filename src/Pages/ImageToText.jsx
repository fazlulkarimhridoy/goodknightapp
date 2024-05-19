import React, { useContext, useEffect, useState } from "react";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import Logo from "../components/Logo";
import Button from "../components/Button";
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
  const [geoLatitude, setGeoLatitude] = useState(null);
  const [geoLongitude, setGeoLongitude] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setCustomerData, customerData, removeData } = useContext(DataContext);
  const { name, age, gender, phone_number, previous_used_product, previous_used_brand, product_code1, product_code2, quantity, latitude, longitude } = customerData;

  // checking if token is valid
  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = "/signin";
  }


  useEffect(() => {
    let watchId;

    const checkLocationStatus = async () => {
      try {
        // Attempt to get the current position to check if location services are enabled
        await Geolocation.getCurrentPosition();
        // If successful, start watching for location changes
        watchId = Geolocation.watchPosition({}, (position) => {
          const latitude = position.coords.latitude.toString();
          const longitude = position.coords.longitude.toString();
          // setCustomerData({ latitude: latitude, longitude: longitude, interested: "yes" });
          setGeoLatitude(latitude);
          setGeoLongitude(longitude);
        });
      } catch (error) {
        // console.log(error);
      }
    };

    // Initially check the location status
    checkLocationStatus();

    // Cleanup function to stop watching the position when the component unmounts
    return () => {
      if (watchId) {
        Geolocation.clearWatch({ id: watchId });
      }
    };
  }, [detectedText1, detectedText2]);

  // handle manual input code1

  const handleManualInput1 = (e) => {
    const updatedValue = parseInt(e.target.value);
    setDetectedText1(updatedValue);
    setCustomerData((prevData) => ({
      ...prevData,
      product_code1: updatedValue,
    }));
  };

  // handle manual input code2
  const handleManualInput2 = (e) => {
    const updatedValue = parseInt(e.target.value);
    setDetectedText2(updatedValue);
    setCustomerData((prevData) => ({
      ...prevData,
      product_code2: updatedValue,
    }));
  };



  // mutation post request
  const customerInfoMutation = useMutation({
    mutationFn: async () => {
      const customerInfo = {
        name: name,
        age: age,
        gender: gender,
        phone_number: phone_number,
        previous_used_product: previous_used_product,
        previous_used_brand: previous_used_brand,
        product_code1: product_code1,
        product_code2: product_code2,
        quantity: quantity,
        latitude: geoLatitude,
        longitude: geoLongitude,
        interested: "yes"
      }
      console.log(customerInfo);
      const response = await axios.post("https://expactivation.app/api/v5/store-customer-info", customerInfo, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success === false) {
        for (const item in data.data) {
          const msg = data.data[item];
          toast.error(msg[0]);
        }
        setLoading(false);
        setIsSubmitting(false);
      } else if (data.success === true) {
        setLoading(false);
        setIsSubmitting(false);
        removeData();
        navigate("/successPage");
        toast.success("Customer Information successfully stored.");
      }
    },
    onError: (error) => {
      setLoading(false);
      setIsSubmitting(false);
      if (error) {
        toast.error("Something went wrong.");
      };
    },
  });


  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setLoading(true);
    const status = await Network.getStatus();
    if (quantity === 1 && geoLatitude && geoLongitude) {
      if (status.connected && product_code1 !== null && product_code1.toString().length === 6) {
        customerInfoMutation.mutate();
      }
      else {
        setLoading(false);
        setIsSubmitting(false);
        if (!status.connected) {
          toast.error("Please check your internet connection.")
        } else if ((product_code1 && product_code1.toString().length !== 6)) {
          toast.error("Please enter 6 digit code.")
        }
        else {
          toast.error("Please enter product code.")
        }
      }
    }
    else if (quantity === 2 && geoLatitude && geoLongitude) {
      if (status.connected && product_code1 && product_code2 && (product_code1 !== null) && (product_code1 !== null) && (product_code1 !== product_code2) && (product_code1.toString().length === 6 && product_code2.toString().length === 6)) {
        customerInfoMutation.mutate();
      }
      else {
        setLoading(false);
        setIsSubmitting(false);
        if (!status.connected) {
          toast.error("Please check your internet connection")
        }
        else if ((product_code1 !== null) && (product_code2 !== null) && (product_code1 === product_code2)) {
          toast.error("Code can not be same")
        }
        else if ((product_code1 && product_code1.toString().length !== 6) || (product_code2 && product_code2.toString().length !== 6)) {
          toast.error("Please enter 6 digit code.")
        }
        else {
          toast.error("Please enter product code")
        }
      }
    } else {
      setLoading(false);
      setIsSubmitting(false);
      if (!geoLatitude && !geoLongitude) {
        toast.error("Location problem!")
      } else {
        toast.error("Please select product quantity.")
      }
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
        // setOcr1(ocrTextNumber)
        // if not number then proceed for result
        if (ocrTextNumber && !isNaN(ocrTextNumber)) {
          setLoading(false);
          setDetectedText1(ocrTextNumber);
          setCustomerData((prevData) => ({
            ...prevData,
            product_code1: ocrTextNumber,
          }));
        }
        else {
          setLoading(false);
          // toast.error("No code found! Try again");
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
        // setOcr2(ocrTextNumber)
        // if not number then proceed for result
        if (ocrTextNumber && !isNaN(ocrTextNumber)) {
          setLoading(false);
          setDetectedText2(ocrTextNumber);
          setCustomerData((prevData) => ({
            ...prevData,
            product_code2: ocrTextNumber,
          }));
        }
        else {
          setLoading(false);
          // toast.error("No code found! Try again");
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
                      required
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
                      required
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
                      required
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
          <div onClick={handleSubmit} className={`${loading ? "mt-[104px]" : "mt-32"}`}>
            <Button title={"SUBMIT"}></Button>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ImageToText;
