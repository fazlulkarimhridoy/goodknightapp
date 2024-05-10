import React, { useContext, useState } from "react";
import Logo from "../components/Logo";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Geolocation } from '@capacitor/geolocation';
import { DataContext } from "../context/DataProvider";
import { CapacitorHttp } from '@capacitor/core';
import toast from "react-hot-toast";
import { motion } from "framer-motion"
import { Spin } from "antd";
import "../CSS/buyprodcutstart.css"
import { Network } from '@capacitor/network';


const BuyProductStart = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const { customerData, removeData } = useContext(DataContext)
  const { name, age, gender, phone_number, previous_used_product, previous_used_brand } = customerData;

  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = "/signin";
  }

  const handleNoClick = async () => {
    setLoading(true);
    const position = await Geolocation?.getCurrentPosition();
    const status = await Network.getStatus();

    // grab latitude & longitude
    const latitude = position?.coords?.latitude.toString();
    const longitude = position?.coords?.longitude.toString();

    const customerInfo = {
      name,
      age,
      gender,
      phone_number,
      previous_used_product,
      previous_used_brand,
      latitude,
      longitude,
      interested: "no"
    };

    const options = {
      url: 'https://goodknight.xri.com.bd/api/v4/store-customer-info',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: customerInfo
    };
    if (status.connected) {
      const response = await CapacitorHttp.post(options);
      console.log(response);
      if (response.data.success === true) {
        console.log("inside if");
        setLoading(false);
        navigate("/homePage");
        removeData()
        toast.success('User data stored successfully!')
      }
      else if (response.data.success === false) {
        for (const item in response.data.data) {
          const msg = response.data.data[item];
          toast.error(msg[0]);
        }
        setLoading(false);
      }
      else if (response.status === 500) {
        setLoading(false);
        toast.error('Could not connect with server!')
      }
      else {
        setLoading(false);
        toast.error('User data is not stored!')
      }
    } else {
      setLoading(false);
      toast.error('Please check your internet connection!')
    }


  }

  return (
    <motion.div initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }} exit={{ x: -400, ease: "easeInOut" }}>
      <Navbar></Navbar>
      <div className="container px-4 font-poppins">
        <div className="pr-12 relative">
          <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
        </div>
        <div className="text-center">
          <p className="text-white mt-4 text-2xl p-2">
            Are you interested to <br /> buy
          </p>
          <p className="text-white mt-4 text-4xl p-2 ">GoodKnight POWER ACTIV+ ?</p>
        </div>
        <div className="mt-5">
          {
            loading ? <Spin
              size="small"
            /> : <></>
          }
        </div>
        <div className="flex justify-between gap-8 mt-40">
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleNoClick} className="text-xl rounded-lg text-white bg-[#303030] px-8 py-2 flex justify-center items-center gap-2"> <ImCross /><span className="text-2xl">NO</span></motion.button>
          <Link to="/calculation">
            <motion.button whileTap={{ scale: 0.9 }} className="text-2xl rounded-lg text-white bg-[#2C9A1A] px-8 py-2 flex justify-center items-center gap-2"> <TiTick /><span className="text-2xl">YES</span></motion.button>
          </Link>
        </div>
      </div>
    </motion.div>

  );
};

export default BuyProductStart;
