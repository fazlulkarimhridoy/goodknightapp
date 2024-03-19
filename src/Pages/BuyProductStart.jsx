import React from "react";
import Logo from "../components/Logo";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const BuyProductStart = () => {

  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = "/signin";
  }

  return (
    <div className="container">
      <div className="pr-14 relative">
        <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
      </div>
    </>

  );
};

export default BuyProductStart;
