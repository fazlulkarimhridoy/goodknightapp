import React from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";



const AddConsumerUse = () => {

  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = "/signin";
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-[#890000] flex flex-col items-center pt-[20px] h-dvh gap-4">
        <div className="pr-12 relative">
          <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
        </div>
        <div className=" space-y-4 text-center">
          <h1 className="text-white mt-4 text-2xl p-2">
            Which present brand/product you’re using to prevent mosquito?
          </h1>
        </div>

        <div className="arrow">
          <select defaultValue={"coil"} name="product" id="product" className=" w-[220px] text-center text-black shadow-slate-300 shadow-inner px-12 py-2 text-2xl font-semibold rounded-xl outline-none bg-[#D9D9D9]">
            <option disabled className="text-xl" value="coil">Coil </option>
            <option className="text-xl" value="saab">Saab</option>
            <option className="text-xl" value="mercedes">Mercedes</option>
            <option className="text-xl" value="audi">Audi</option>
          </select>
        </div>

        <div>
          <button className="btn-primary">Liquid Vaporizer</button>
        </div>
        <div>
          <button className="btn-primary">Others</button>
        </div>
        <div className="mt-12">
          <Link to="/getproductname">
            <Button title={'NEXT'}></Button>
          </Link>
        </div>


      </div>
    </>
  );
};

export default AddConsumerUse;
