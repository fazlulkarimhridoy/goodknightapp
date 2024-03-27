import React, { useContext } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../context/DataProvider";
import { CapacitorHttp } from '@capacitor/core';
import { motion } from "framer-motion";

const ConsumerForm = () => {

  const navigate = useNavigate();
  const { customerData, setCustomerData, handleChange } =
    useContext(DataContext);
  const { name, age, gender, phone_number } = customerData;
  console.log(customerData);

  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/signin");
  }


  const handleNumberCheck = async () => {

    // post request using capacitor http request
    const options = {
      url: 'https://goodknight.xri.com.bd/api/check-customer-number',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: { phone_number: phone_number }
    };
    const response = await CapacitorHttp.post(options);
    const newCustomer = response.data.new_customer;
    if (newCustomer) {
      navigate('/buyproductstart');
    }
    else if (!newCustomer) {
      navigate('/duplicateCustomer');
    }
    else {
      console.log(response.data.message);
    }

  };
  return (
    <div className="bg-[#890000]">
      <Navbar></Navbar>
      <div className="container">
        <div className="pr-12 relative">
          <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
        </div>
        <div className="text-center">
          <h1 className="text-white text-xl">
            Consumer’s information
          </h1>
        </div>

        {/* Input Box ................. */}
        <form >
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-white" for="name">Name</label> <br />
              <input
                value={name}
                onChange={handleChange}
                name="name"
                required
                placeholder="name"
                type="text"
                className="mt-1 w-[300px] truncate py-1 text-center  text-black  shadow-inner shadow-[#00000080]  px-12 text-2xl font-normal rounded-xl outline-none bg-[#D9D9D9]"
              ></input>
            </div>
            <div>
              <label className="text-white" for="Age">Age</label> <br />
              <input
                value={age}
                onChange={handleChange}
                name="age"
                required
                placeholder="age"
                type="number"
                className="mt-1 w-[300px] truncate py-1 text-center  text-black  shadow-inner shadow-[#00000080]  px-12 text-2xl font-normal rounded-xl outline-none bg-[#D9D9D9]"
              ></input>
            </div>
            <div className="arrow">
              <label className="text-white" for="gender">Gender</label> <br />
              <select
                defaultValue={gender ? gender : "gender"}
                onChange={handleChange}
                name="gender"
                required
                id="product"
                placeholder="gender"
                className="mt-1 w-[300px] truncate py-[2px] text-center  text-black  shadow-inner shadow-[#00000080]  px-12 text-2xl font-normal rounded-xl outline-none bg-[#D9D9D9]"
              >

                <option disabled className="text-xl" value="gender">
                  gender
                </option>
                <option className="text-xl" value="male">
                  Male
                </option>
                <option className="text-xl" value="female">
                  Female
                </option>
              </select>
            </div>
            <div>
              <label className="text-white" for="phone_number">Phone Number</label> <br />
              <input
                value={phone_number}
                onChange={handleChange}
                name="phone_number"
                required
                placeholder="mobile"
                type="number"
                className="mt-1 w-[300px] truncate py-1 text-center  text-black  shadow-inner shadow-[#00000080]  px-12 text-2xl font-normal rounded-xl outline-none bg-[#D9D9D9]"
              ></input>
            </div>
          </div>
        </form>
        {
          (name?.length === 0 || age?.length === 0 || gender?.length === 0 || phone_number?.length === 0) ? <div className="mt-8">
            <Button title={"NEXT"}></Button>
          </div>
            :
            <div onClick={handleNumberCheck} className="my-8">
              <Button title={"NEXT"}></Button>
            </div>
        }
        {
          ((name?.length === 0 && <div className="text-white">name is required</div>)||(age?.length === 0 && <div className="text-white">age is required</div>)||(gender?.length === 0 && <div className="text-white">gender is required</div>)||((phone_number.length === 0 && phone_number.length !== 11)  && <div className="text-white">number is required</div>))
        }

      </div >
    </div>
  );
};

export default ConsumerForm;
