import React, { useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Geolocation } from '@capacitor/geolocation';


const ConsumerForm = () => {

  const location = async () => {
    // get the users current position
    const position = await Geolocation?.getCurrentPosition();

    // grab latitude & longitude
    const latitude = position?.coords?.latitude;
    const longitude = position?.coords?.longitude;
  };



  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = "/signin";
  }

  const [number, setNumber] = useState(null);

  const handleNumber = (e) => {
    const number = e.target.value;
    setNumber(number);
  }

  const handleNumberCheck = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    axios.post('https://goodknight.xri.com.bd/api/check-customer-number', { phone_number: number }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data.new_customer) {
          window.location.href = '/buyproductstart';
        }
        else if (!res.data.new_customer) {
          window.location.href = '/homePage';
        }
        else {
          console.log(res.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="pr-12 relative">
          <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
        </div>
        <div className=" space-y-4 text-center">
          <h1 className="text-white mt-4 text-2xl p-2">Consumer’s information</h1>
        </div>

        {/* Input Box ................. */}

        <div className="flex flex-col gap-2">
          <div>
            <input
              onClick={location}
              required
              placeholder="name"
              type="text"
              className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
            ></input>
          </div>
          <div>
            <input
              required
              placeholder="age"
              type="number"
              className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
            ></input>
          </div>
          <div className="arrow">
            <select
              required
              defaultValue={"coil"}
              name="product"
              id="product"
              className=" w-[220px] text-center text-black shadow-slate-300 shadow-inner  py-2 text-2xl font-semibold rounded-xl outline-none bg-[#D9D9D9]"
            >
              <option disabled className="text-xl" value="coil">
                Gender
              </option>
              <option className="text-xl" value="saab">
                Male
              </option>
              <option className="text-xl" value="mercedes">
                Female
              </option>
            </select>
          </div>
          <div>
            <input
              required
              onChange={handleNumber}
              name="number"
              placeholder="mobile"
              type="number"
              className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
            ></input>
          </div>
        </div>
        <div onClick={handleNumberCheck} className="mt-12">
          <Button title={"NEXT"}></Button>
        </div>
      </div>
    </>
  );
};

export default ConsumerForm;
