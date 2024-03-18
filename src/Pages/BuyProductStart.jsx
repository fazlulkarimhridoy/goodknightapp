import React from "react";
import Logo from "../components/Logo";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const BuyProductStart = () => {

  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = "/signin";
  }

  return (
    <div className="container">
      <div className="pr-12 relative">
        <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
      </div>
      <div className="text-center">
        <p className="text-white mt-4 text-2xl p-2">
          Are you interested to buy
        </p>
        <p className="text-white mt-4 text-4xl p-2">GoodKnight POWER ACTIV+ ?</p>
      </div>
      <div className="flex justify-between gap-10">
        <button className="text-xl text-white bg-[#303030] px-8 py-2 flex justify-center items-center gap-2"> <ImCross /><span className="text-2xl">NO</span></button>
        <Link to="/consumerform">
          <button className="text-3xl text-white bg-[#2C9A1A] px-8 py-2 flex justify-center items-center gap-2"> <TiTick /><span className="text-2xl">YES</span></button>
        </Link>
      </div>
    </div>
  );
};

export default BuyProductStart;
