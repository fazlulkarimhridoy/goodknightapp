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
    <div className="bg-[#890000]">
      <Navbar></Navbar>
      <div className="bg-[#890000]">
        <div className="container">
          <div className="pr-12 relative">
            <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
          </div>
          <div className=" space-y-4 text-center">
            <h1 className="text-white mt-4 text-2xl p-2">Brand name ?</h1>
          </div>
          <div className="arrow">
            <label className="text-white" for="product-list">
              Product List
            </label>{" "}
            <br />
            <select
              onChange={handleChange}
              defaultValue={previous_used_brand ? previous_used_brand : "product list" }
              name="previous_used_brand"
              id="product"
              className="mt-2 w-[300px]  shadow-inner shadow-[#00000080] py-1.5 font-normal text-center text-black   text-2xl  rounded-xl outline-none bg-[#D9D9D9]"
            >
              <option disabled className="text-xl" value="product list">
                Product List
              </option>
              <option className="text-xl" value="RAK">
                RAK
              </option>
              <option className="text-xl" value="Baoma">
                Baoma
              </option>
              <option className="text-xl" value="Magic">
                Magic
              </option>
              <option className="text-xl" value="Magic">
                Jonaki
              </option>
              <option className="text-xl" value="Magic">
                Eagle
              </option>
            </select>
          </div>
          <div className="arrow">
            <label className="text-white" for="others">
              Others
            </label>{" "}
            <br />
            <select
              onChange={handleChange}
              defaultValue={previous_used_brand ? previous_used_brand : "others" }
              name="previous_used_brand"
              id="product"
              className="mt-2 w-[300px]  shadow-inner shadow-[#00000080] py-1.5 font-normal text-center text-black   text-2xl  rounded-xl outline-none bg-[#D9D9D9]"
            >
              <option disabled className="text-xl" value="others">
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
              className="w-[300px] placeholder:italic placeholder:font-normal bg-[#D9D9D9] placeholder:text-xl text-center pb-2 text-black shadow-slate-300 shadow-inner py-1.5 text-2xl font-normal rounded-xl outline-none"
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
              <Link to="/video">
                <Button title={"NEXT"}></Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumedProductName;
