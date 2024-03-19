import React, { useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { Link } from "react-router-dom";

const ConsumerForm = () => {
  const { customerData, setCustomerData, handleChange } =
    useContext(DataContext);
  const { name, age, gender, phone_number } = customerData;
  console.log(name);
  return (
    <div className="container">
      <div className="pr-14 relative">
        <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
      </div>
      <div className=" space-y-4 text-center">
        <h1 className="text-white mt-4 text-2xl p-2">Consumer’s information</h1>
      </div>

        {/* Input Box ................. */}

      <div className="flex flex-col gap-2">
        <div>
          <input
            value={name}
            onChange={handleChange}
            name="name"
            placeholder="name"
            type="text"
            className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
          ></input>
        </div>
        <div>
          <input
            value={age}
            onChange={handleChange}
            name="age"
            placeholder="age"
            type="number"
            className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
          ></input>
        </div>
        <div className="arrow">
          <select
            value={gender}
            onChange={handleChange}
            name="gender"
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
            value={phone_number}
            onChange={handleChange}
            name="phone_number"
            placeholder="mobile"
            type="text"
            className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
          ></input>
        </div>
      </div>
      <div className="mt-12">
        <Link to={"/buyproductstart"}>
          <Button title={"NEXT"}></Button>
        </Link>
      </div>
    </div>
  );
};

export default ConsumerForm;
