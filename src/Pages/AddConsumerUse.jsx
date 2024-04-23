import React, { useContext } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { DataContext } from "../context/DataProvider";
import { motion } from "framer-motion";

const AddConsumerUse = () => {
  const { customerData, setCustomerData, handleChange } =
    useContext(DataContext);
  const navigate = useNavigate();
  const { previous_used_product } = customerData;

  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/signin");
  }

  const handleVaporizer = (e) => {
    handleChange(e);
    navigate("/video")
  }

  return (
    <motion.div initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }} exit={{ x: -400, ease: "easeInOut" }} className="bg-[#890000] overflow-hidden">
      <Navbar></Navbar>
      <div className=" bg-[#890000]">
        <div className="container">
          <div className="pr-12 relative">
            <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
          </div>
          <div className="text-center">
            <h1 className="text-white text-xl">
              Which present brand/ <br />
              product you’re using to <br />
              prevent mosquito?
            </h1>
          </div>

          <div className="arrow">
            <label className="text-white" for="Coil">
              Coil
            </label>{" "}
            <br />
            <motion.button
              whileTap={{ scale: 0.9 }}

              name="previous_used_product"
              value={"Coil"}
              onClick={handleChange}
              className={`btn-primary mt-1 w-[300px] truncate py-1 text-center  text-black  shadow-inner shadow-[#00000080]  px-12 text-2xl font-normal rounded-xl outline-none ${previous_used_product === "coil"
                ? "bg-[#393939] text-white"
                : ""
                }`}
            >
              Coil
            </motion.button>
          </div>

          <div>
            <label className="text-white" for="vaporizer">
              Vaporizer
            </label>{" "}
            <br />
            <motion.button
              whileTap={{ scale: 0.9 }}

              name="previous_used_product"
              value={"Liquid Vaporizer"}
              onClick={handleVaporizer}
              className={`btn-primary mt-1 w-[300px] truncate py-1 text-center  text-black  shadow-inner shadow-[#00000080]  px-12 text-2xl font-normal rounded-xl outline-none ${previous_used_product === "Liquid Vaporizer"
                ? "bg-[#393939] text-white"
                : ""
                }`}
            >
              Liquid Vaporizer
            </motion.button>
          </div>
          <div>
            <label className="text-white" for="others">
              Others
            </label>{" "}
            <br />
            <motion.button
              whileTap={{ scale: 0.9 }}
              name="previous_used_product"
              value={"others"}
              onClick={handleChange}
              className={`btn-primary mt-1 w-[300px] text-black  text-2xl  py-1  font-normal  px-0  shadow-inner shadow-[#00000080] ${previous_used_product === "others"
                ? "bg-[#393939] text-white"
                : ""
                }`}
            >
              Others
            </motion.button>
          </div>
          {previous_used_product?.length === 0 ? (
            <div className="mt-5">
              <Link to="">
                <Button title={"NEXT"}></Button>
              </Link>
              <p className="text-white text-center p-2">Please select</p>
            </div>
          ) : (
            <div className="mt-5">
              <Link to="/getproductname">
                <Button title={"NEXT"}></Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AddConsumerUse;
