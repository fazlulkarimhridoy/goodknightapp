import React, { useContext } from "react";
import Logo from "../components/Logo";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Geolocation } from '@capacitor/geolocation';
import { DataContext } from "../context/DataProvider";
import { CapacitorHttp } from '@capacitor/core';


const BuyProductStart = () => {
  const { customerData } = useContext(DataContext)
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

    // await axios.post('https://goodknight.xri.com.bd/api/store-customer-info', data, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then(res => {
    //     console.log(res.data);
    //     window.location.href = '/homePage';
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })

    // fetch('https://goodknight.xri.com.bd/api/store-customer-info', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     window.location.href = '/homePage';
    //   })

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
      window.location.href = '/homePage';
    }
    else {
      console.log(response);
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
          <button onClick={handleNoClick} className="text-xl text-white bg-[#303030] px-8 py-2 flex justify-center items-center gap-2"> <ImCross /><span className="text-2xl">NO</span></button>
          <Link to="/calculation">
            <button className="text-3xl text-white bg-[#2C9A1A] px-8 py-2 flex justify-center items-center gap-2"> <TiTick /><span className="text-2xl">YES</span></button>
          </Link>
        </div>
      </div>
    </>

  );
};

export default BuyProductStart;
