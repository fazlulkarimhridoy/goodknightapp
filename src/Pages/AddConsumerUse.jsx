import React, { useContext } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { DataContext } from "../context/DataProvider";

const AddConsumerUse = () => {
  const { customerData, setCustomerData, handleChange } =
    useContext(DataContext);

  const { previous_used_product } = customerData;

  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/signin");
  }

  return (
    <div className="bg-[#890000] overflow-hidden">
      <Navbar></Navbar>
      <div className=" bg-[#890000]">
        <div className="container">
          <div className="pr-12 relative">
            <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
          </div>
          <div className=" space-y-4 text-center">
            <h1 className="text-white mt-4 text-lg p-2">
              Which present brand/product you’re using to prevent mosquito???
            </h1>
          </div>

          <div className="arrow">
            <label className="text-white" for="Coil">Coil</label> <br />
            <select
              onChange={handleChange}
              value={previous_used_product}
              name="previous_used_product"
              id="product"
              className="mt-2 w-[300px] truncate py-1 text-center  text-black  shadow-inner shadow-[#00000080]  px-12 text-xl font-normal rounded-xl outline-none bg-[#D9D9D9]"
            >
              <option disabled className="text-xl" value="coil">
                Coil{" "}
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

          <div>
            <label className="text-white" for="vaporizer">Vaporizer</label> <br />
            <button
              name="previous_used_product"
              value={"Liquid Vaporizer"}
              onClick={handleChange}
              className={`btn-primary mt-2 w-[300px] truncate py-1 text-center  text-black  shadow-inner shadow-[#00000080]  px-12 text-xl font-normal rounded-xl outline-none ${previous_used_product === "Liquid Vaporizer" ? "bg-[#393939] text-white" : ""
                }`}
            >
              Liquid Vaporizer
            </button>
          </div>
          <div>
            <label className="text-white" for="others">Others</label> <br />
            <button
              name="previous_used_product"
              value={"others"}
              onClick={handleChange}
              className={`btn-primary mt-2 w-[300px] text-black  text-2xl  py-1  font-normal  px-0  shadow-inner shadow-[#00000080] ${previous_used_product === "others" ? "bg-[#393939] text-white" : ""
                }`}
            >
              Others
            </button>
          </div>
          {previous_used_product?.length === 0 ? (
            <div className="my-12">
              <Link to="">
                <Button title={"NEXT"}></Button>
              </Link>
              <p className="text-white text-center p-2">Please select</p>
            </div>
          ) : (
            <div className="my-12">
              <Link to="/getproductname">
                <Button title={"NEXT"}></Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddConsumerUse;
