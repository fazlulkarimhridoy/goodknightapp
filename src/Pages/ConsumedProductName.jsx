import React, { useContext } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { DataContext } from "../context/DataProvider";

const ConsumedProductName = () => {
  const { customerData, handleChange } = useContext(DataContext);

  const { previous_used_brand } = customerData;
  console.log(customerData);

  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/signin");
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="h-dvh bg-[#890000]">
        <div className="container">
          <div className="pr-12 relative">
            <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
          </div>
          <div className=" space-y-4 text-center">
            <h1 className="text-white mt-4 text-2xl p-2">Brand name ?</h1>
          </div>
          <div className="arrow">
            <select
              onChange={handleChange}
              value={previous_used_brand}
              name="previous_used_brand"
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
              onChange={handleChange}
              value={previous_used_brand}
              name="previous_used_brand"
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
              onChange={handleChange}
              value={previous_used_brand}
              name="previous_used_brand"
              placeholder="Type here"
              type="text"
              className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
            ></input>
          </div>
          {previous_used_brand?.length === 0 ? (
            <div className="my-12">
              <Link to="">
                <Button title={"NEXT"}></Button>
              </Link>

              <p className="text-white text-center p-2">Please select</p>
            </div>
          ) : (
            <div className="my-12">
              <Link to="/consumerform">
                <Button title={"NEXT"}></Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConsumedProductName;
