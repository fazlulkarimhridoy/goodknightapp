import React, { useState } from "react";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import Logo from "../components/Logo";
import Button from "../components/Button";
import Tesseract from "tesseract.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const ImageToText = () => {
  const [detectedText1, setDetectedText1] = useState(null);
  const [detectedText2, setDetectedText2] = useState(null);
  const navigate = useNavigate();

  //   const { setCustomerData, customerData,  handleChange } = useContext(DataContext);

  const handleSubmit = () => {
    if (detectedText1 && detectedText2 != null) {
      navigate("/successPage")
    }
  }

  const handleDetectedText = async (img) => {
    const { data: { text } } = await Tesseract.recognize(
      img,
      'eng', // language
      { logger: m => console.log(m) }
    );
    return text;
  }


  // handle product code 1
  const handleProductCode1 = async () => {

    try {
      // Capture photo
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      const data = handleDetectedText(photo.webPath);
      console.log(data.then((result) => {
        setDetectedText1(result);
      }));


    } catch (error) {
      console.error('Error capturing image', error);
    }
  }

  // handle product code 2
  const handleProductCode2 = async () => {

    try {
      // Capture photo
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      const data = handleDetectedText(photo.webPath);
      console.log(data.then((result) => {
        setDetectedText2(result);
      }));


    } catch (error) {
      console.error('Error capturing image', error);
    }
  }




  return (
    <div>
      <Navbar></Navbar>
      <div className="container font-poppins">
        <section className="flex flex-col justify-center items-center gap-4">

          <div className="pr-12 relative">
            <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
          </div>
          <p className="text-2xl text-white mt-20">Give Product Code</p>

          <div className="flex flex-col gap-4 px-2 mt-2">

            {/* product 01 */}
            <div className=" flex  space-x-5 ">
              <p className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-xl font-bold rounded-xl outline-none">
                {detectedText1}
              </p>
              <button
                onClick={handleProductCode1}
                className="bg-[#D9D9D9] px-4 py-2 rounded-lg"
              >
                <img src="/images/cameraIcon.svg"></img>
              </button>
            </div>
            {/* product 02 */}
            <div className=" flex  space-x-5">
              <p className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-xl font-bold rounded-xl outline-none">
                {detectedText2}
              </p>
              <button
                onClick={handleProductCode2}
                className="bg-[#D9D9D9] px-4 py-2 rounded-lg"
              >
                <img src="/images/cameraIcon.svg"></img>
              </button>
            </div>

          </div>
          <div onClick={handleSubmit} className="mt-32">
            <Button title={"SUBMIT"}></Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImageToText;
