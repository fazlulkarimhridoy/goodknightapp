import React from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import warningImage from "../../public/images/warning.svg"


const ExistedConsumerError = () => {
  return (
    <div className="container h-screen">
      <div className="pr-14 mt-16 relative">
        <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
      </div>
      <div className="text-center mt-14 space-y-4 flex flex-col  items-center">
        <img src={warningImage}></img>
        <p className=" max-w-56 text-2xl text-white max">This consumer is
          already registered</p>
      </div>
      <div className="mt-20">
        <Link to={"/consumerform"}>
          <Button title={"Back"}></Button>
        </Link>
      </div>
    </div>
  );
};

export default ExistedConsumerError;
