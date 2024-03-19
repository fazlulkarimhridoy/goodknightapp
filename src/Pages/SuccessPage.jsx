import React from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="container">
      <div className="pr-14 relative">
        <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
      </div>
      <div className="text-center mt-14 space-y-4">
        <img width={120} src="/images/successIcon.svg"></img>
        <p className="text-2xl text-white">Successful</p>
      </div>
      <div className="mt-20">
        <Link to={"/homePage"}>
          <Button title={"HOME"}></Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
