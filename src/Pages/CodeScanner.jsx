import React, { useContext, useState } from "react";
import Tesseract from "tesseract.js";
import CameraComponent from "./Camera";
import PhotoCaptureComponent from "./PhotoCapture";
import { DataContext } from "../context/DataProvider";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import toast from "react-hot-toast";

const OCRApp = () => {
  const navigate = useNavigate()
  const { photoURL, setPhotoURL, text, setText, customerData } = useContext(DataContext);
  const [imageURL, setImageURL] = useState("");
  console.log(customerData);
  //   const [text, setText] = useState("");

  //   const handleImageInputChange = event => {
  //     const file = event.target.files[0];
  //     const imageURL = URL.createObjectURL(file);
  //     setImageURL(imageURL);
  //   };

  const handleSubmit = () => {
    navigate("/homePage")
    toast.success('Successfully data stored!')
  }

  return (
    <div className="container">
      <div className="pr-12 relative">
        <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
      </div>
      <p className="text-2xl text-white ">Give product code</p>
      <div className=" flex  space-x-5">
        <p className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none">{text}</p>
        <Link to={'/takeImage'}>
          <button className="bg-[#D9D9D9] px-4 py-2 rounded-lg">
            <img src="/images/cameraIcon.svg"></img>
          </button>
        </Link>
      </div>
      <div className=" flex  space-x-5">
        <input
          value={text}
          name="product_code2"
          required
          disabled
          placeholder="Product code 2"
          type="number"
          className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
        ></input>
        <button className="bg-[#D9D9D9] px-4 py-2 rounded-lg">
          <img src="/images/cameraIcon.svg"></img>
        </button>
      </div>
      <div onClick={handleSubmit} className="mt-20">
        <Button title={"SUBMIT"}></Button>
      </div>
      {/* <input type="file" onChange={handleImageInputChange} accept="image/*" /> */}
      {/* <button onClick={extractTextFromImage}>Extract Text</button>
      {imageURL && (
        <img src={imageURL} alt="Uploaded" style={{ maxWidth: "300px" }} />
      )}
      {text && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{text}</p>
        </div>
      )} */}

      {/* <div>
        <PhotoCaptureComponent />
      </div> */}
    </div>
  );
};

export default OCRApp;
