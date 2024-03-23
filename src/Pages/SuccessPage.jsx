import React from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import successIcon from "../../public/images/successIcon.svg"

const SuccessPage = () => {

  // redirect to home page
  const redirectHome = () => {
    window.location.href = "/homePage";
  };

  return (
    <div className="container bg-[#890000]">
      <div className="pr-14 relative mt-16">
        <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
      </div>
      <div className="text-center mt-14 space-y-4">
        <img width={120} src={successIcon}></img>
        <p className="text-2xl text-white">Successful</p>
      </div>
      <div onClick={redirectHome} className="mt-20">
          <Button title={"HOME"}></Button>
      </div>
    </div>
  );
};

export default SuccessPage;
