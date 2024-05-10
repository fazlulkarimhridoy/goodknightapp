import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import { DataContext } from "../context/DataProvider";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AmountCalculation = () => {
  const { setCustomerData, customerData } = useContext(DataContext);
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [saving, setSaving] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = "/signin";
  }

  // handle quantity 1
  const handleQuantity1 = () => {
    const price = 120;
    setAmount(price);
    setSaving(50);
    setQuantity(1);
    setCustomerData((prevData) => ({
      ...prevData,
      quantity: 1,
    }));
  }
  // handle quantity 2
  const handleQuantity2 = () => {
    const price = 120 * 2;
    setAmount(price);
    setSaving(50 * 2);
    setQuantity(2);
    setCustomerData((prevData) => ({
      ...prevData,
      quantity: 2,
    }));
  }

  const handleSubmit = () => {
    if (quantity === 1 || quantity === 2) {
      navigate("/number")
    } else {
      toast.error("Please enter a quantity");
    }
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
              • MRP. Per Unit BDT 170/-
              <br />• Discounted MRP. BDT 120/-
            </h4>
          </div>

          <h2 className="text-white text-4xl font-bold">
            BDT {amount}/-
          </h2>

          <div onClick={handleSubmit} className="my-4">
            <Button title={"NEXT"}></Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AmountCalculation;
