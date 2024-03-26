import React, { useContext, useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Ocr } from "@capacitor-community/image-to-text";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { DataContext } from "../context/DataProvider";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const ImageToText = () => {
  const [detectedText, setDetectedText] = useState("");
//   const { setCustomerData, customerData,  handleChange } = useContext(DataContext);

//   const { product_code1 , product_code2} = customerData
 const handleSubmit = () => {
    console.log(detectedText)
 }

  const captureImageAndRecognizeText = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      const textDetections = await Ocr.detectText({ filename: photo.path });

      let text = "";
      for (let detection of textDetections.textDetections) {
        text += detection.text + "\n";
      }
      setDetectedText(text);
      console.log(text)
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };
  defineCustomElements(window);
  return (
    <div className="container font-poppins">
      <section className="flex flex-col justify-center items-center pt-28 gap-4">
        <div className="pr-12 relative">
          <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
        </div>

        <p className="text-2xl text-white ">Give product code</p>

        <div className="flex flex-col gap-4 px-2 pt-10">
          <div className=" flex  space-x-5 ">
            <p className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none">
              {detectedText}
            </p>
            <Link to={"/takeImage"}>
              <button
                onClick={captureImageAndRecognizeText}
                className="bg-[#D9D9D9] px-4 py-2 rounded-lg"
              >
                <img src="/images/cameraIcon.svg"></img>
              </button>
            </Link>
          </div>
          <div className=" flex  space-x-5">
            <p className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none">
              {detectedText}
            </p>
            <button
              onClick={captureImageAndRecognizeText}
              className="bg-[#D9D9D9] px-4 py-2 rounded-lg"
            >
              <img src="/images/cameraIcon.svg"></img>
            </button>
          </div>
        </div>
        <div className="pt-8"> 
          <Button func={handleSubmit}  title={"SUBMIT"}></Button>
        </div>
      </section>
    </div>
    // <div>
    //     <button onClick={captureImageAndRecognizeText}>Capture Image</button>
    //     <div>
    //         <h2>Detected Text:</h2>
    //         <p>{detectedText}</p>
    //     </div>
    // </div>
  );
};

export default ImageToText;
