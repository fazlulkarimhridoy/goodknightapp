import React, { useContext } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CapacitorHttp } from "@capacitor/core";
import { DataContext } from "../context/DataProvider";
import { motion } from "framer-motion";

const MobileNumber = () => {
  const { customerData } = useContext(DataContext);
  const { phone_number } = customerData;
  const navigate = useNavigate();
  console.log("phone", phone_number);

  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/signin");
  }

  // generate otp
  const handleOtpVerification = async () => {
    const options = {
      url: "https://goodknight.xri.com.bd/api/send-otp",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { phone_number: phone_number },
    };
    const response = await CapacitorHttp.post(options);
    console.log(response.data.otp);
    const otp = response.data.otp;
    if (otp) {
      localStorage.setItem("otp", otp);
      navigate("/otp");
    } else {
      console.log(response);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      exit={{ x: -400, ease: "easeInOut" }}
      className="bg-[#890000]"
    >
      <Navbar></Navbar>
      <div className="container">
        <div className="pr-12 relative">
          <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
        </div>
        <div className=" space-y-4 text-center mt-16">
          <h1 className="text-white mt-4 text-2xl p-2">Mobile no.</h1>
          <h1 className="text-white mt-4 text-2xl font-bold p-2">
            {phone_number}
          </h1>
        </div>

        <div onClick={handleOtpVerification} className="mt-[176px]">
          <Button title={"Send Otp"} />
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNumber;
