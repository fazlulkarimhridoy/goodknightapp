import React, { useContext } from "react";
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

const BuyProductStart = () => {
  const navigate = useNavigate()
  const { customerData,removeData } = useContext(DataContext)
  const { name, age, gender, phone_number, previous_used_product, previous_used_brand } = customerData;
  console.log(customerData);

  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = "/signin";
  }

  const handleNoClick = async () => {
    const position = await Geolocation?.getCurrentPosition();

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
      url: 'https://goodknight.xri.com.bd/api/store-customer-info',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: customerInfo
    };
    const response = await CapacitorHttp.post(options);
    console.log(response);
    if (response.status === 201) {
      navigate("/homePage");
      toast.success('User data stored successfully!')
      removeData()

    }
    else {
      toast.error('User data is not stored!')
    }

  }

  return (
    <>
      <Navbar></Navbar>
      <div className="container px-4 font-poppins">
        <div className="pr-12 relative">
          <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
        </div>
        <div className="text-center">
          <p className="text-white mt-4 text-2xl p-2">
            Are you interested to buy
          </p>
          <p className="text-white mt-4 text-4xl p-2 ">GoodKnight POWER ACTIV+ ?</p>
        </div>
        <div className="flex justify-between gap-10 pt-20">
          <motion.button whileTap={{ scale: 0.9}} onClick={handleNoClick} className="text-xl text-white bg-[#303030] px-8 py-2 flex justify-center items-center gap-2"> <ImCross /><span className="text-2xl">NO</span></motion.button>
          <Link to="/calculation">
            <motion.button whileTap={{ scale: 0.9}} className="text-3xl text-white bg-[#2C9A1A] px-8 py-2 flex justify-center items-center gap-2"> <TiTick /><span className="text-2xl">YES</span></motion.button>
          </Link>
        </div>
      </div>
    </>

  );
};

export default BuyProductStart;
