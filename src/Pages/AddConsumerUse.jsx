import React, { useContext, useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";



const AddConsumerUse = () => {
  const {customerData,setCustomerData,handleChange} = useContext(DataContext)

 const {previous_used_product} = customerData

 
  return (
    <div className="container">
      <div className="pr-14 relative">
        <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
      </div>
      <div className=" space-y-4 text-center">
        <h1 className="text-white mt-4 text-2xl p-2">
          Which present brand/product you’re using to prevent mosquito?
        </h1>
      </div>
      <div className="arrow">
        <select onChange={handleChange} value={previous_used_product}  name="previous_used_product" id="product" className=" w-[220px] text-center text-black shadow-slate-300 shadow-inner px-12 py-2 text-2xl font-semibold rounded-xl outline-none bg-[#D9D9D9] ">
          <option  className="text-xl" value="coil">Coil </option>
          <option className="text-xl" value="saab">Saab</option>
          <option className="text-xl" value="mercedes">Mercedes</option>
          <option className="text-xl" value="audi">Audi</option>
        </select>
      </div>

      <div>
        <button name="previous_used_product" value={'Liquid Vaporizer'} onClick={handleChange}  className={`btn-primary ${previous_used_product === "Liquid Vaporizer" ? "bg-[#393939]" : ""}`}>Liquid Vaporizer</button>
      </div>
      <div>
        <button name="previous_used_product" value={'others'} onClick={handleChange} className={`btn-primary ${previous_used_product === "others" ? "bg-[#393939]" : ""}`}>Others</button>
      </div>
   
      <div className="mt-12">
        <Link to="/getproductname">
          <Button title={'NEXT'}></Button>
        </Link>
      </div>


      </div>
  );
};

export default AddConsumerUse;
