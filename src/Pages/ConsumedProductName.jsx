import React from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";

const ConsumedProductName = () => {
  return (
    <div className="container">
      <div className="pr-12 relative">
        <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
      </div>
      <div className=" space-y-4 text-center">
        <h1 className="text-white mt-4 text-2xl p-2">Brand name ?</h1>
      </div>
      <div className="arrow">
        <select
          defaultValue={"coil"}
          name="product"
          id="product"
          className=" w-[220px] text-center text-black shadow-slate-300 shadow-inner  py-2 text-2xl font-semibold rounded-xl outline-none bg-[#D9D9D9]"
        >
          <option disabled className="text-xl" value="coil">
            Product List
          </option>
          <option className="text-xl" value="saab">
            Saab
          </option>
          <option className="text-xl" value="mercedes">
            Mercedes
          </option>
          <option className="text-xl" value="audi">
            Audi
          </option>
        </select>
      </div>
      <div className="arrow">
        <select
          defaultValue={"coil"}
          name="product"
          id="product"
          className=" w-[220px] text-center text-black shadow-slate-300 shadow-inner  py-2 text-2xl font-semibold rounded-xl outline-none bg-[#D9D9D9]"
        >
          <option disabled className="text-xl" value="coil">
            Others
          </option>
          <option className="text-xl" value="saab">
            Saab
          </option>
          <option className="text-xl" value="mercedes">
            Mercedes
          </option>
          <option className="text-xl" value="audi">
            Audi
          </option>
        </select>
      </div>
      <p className="text-white text-2xl">or</p>
      <div>
        <input
          placeholder="Type here"
          type="text"
          className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
        ></input>
      </div>
      <div className="mt-12">
        <Button title={"NEXT"}></Button>
      </div>
    </div>
  );
};

export default ConsumedProductName;
