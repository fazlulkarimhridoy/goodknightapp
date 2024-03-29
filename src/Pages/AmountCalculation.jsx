import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import { DataContext } from "../context/DataProvider";
import { motion } from "framer-motion";

const AmountCalculation = () => {
  const { setCustomerData, customerData, handleChange } = useContext(DataContext);

  console.log(customerData);

  const [amount, setAmount] = useState(0);
  const [saving, setSaving] = useState(null);
  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = "/signin";
  }

  // handle quantity 1
  const handleQuantity1 = () => {
    const price = 115;
    setAmount(price);
    setSaving(34);
    setCustomerData((prevData) => ({
      ...prevData,
      quantity: 1,
    }));
  }
  // handle quantity 2
  const handleQuantity2 = () => {
    const price = 115 * 2;
    setAmount(price);
    setSaving(34 * 2);
    setCustomerData((prevData) => ({
      ...prevData,
      quantity: 2,
    }));
  }

  return (
    <motion.div initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      exit={{ x: -400, ease: "easeInOut" }}>
      <Navbar></Navbar>
      <div className="bg-[#890000]">
        <div className="container">
          <div className="pr-12 relative">
            <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
          </div>
          <div className=" space-y-4 text-center">
            <h1 className="text-white mt-2 text-2xl p-2">Select quantity</h1>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button onClick={handleQuantity1} className="btn-primary w-14 h-14">1</button>
            <h1 className="text-white text-2xl">or</h1>
            <button onClick={handleQuantity2} className="btn-primary w-14 h-14">2</button>
          </div>

          <div className="mt-3">
            <h1 className="text-white text-2xl text-center">Total savings</h1>
            <input
              value={saving}
              disabled
              placeholder="Auto Calculation"
              type="number"
              className="w-[220px] bg-[#D9D9D9] mt-5 italic text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
            ></input>
          </div>

          <div>
            <h4 className="text-white text-xs">
              • MRP. Per Unit BDT 149/-
              <br />• Discounted MRP. BDT 115/-
            </h4>
          </div>

          <h2 className="text-white text-4xl font-bold">
            BDT {amount}/-
          </h2>

          <div className="my-4">
            <Link to="/number">
              <Button title={"NEXT"}></Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AmountCalculation;
