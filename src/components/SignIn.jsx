import React, { useEffect, useState } from "react";
import { CapacitorHttp } from "@capacitor/core";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Spin } from "antd";
import "../CSS/signin.css"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const SignIn = () => {
  // states
  const [bpId, setBpId] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // handle bp id
  const handleBpId = (e) => {
    setBpId(e.target.value);
  };
  // handle password
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };


  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }


  // handle login
  const userLogIn = async () => {
    setLoading(true);

    const latitude = localStorage.getItem("latitude");
    const longitude = localStorage.getItem("longitude");

    const customerData = {
      bp_id: bpId,
      password: password,
      latitude: latitude,
      longitude: longitude
    };

    // post request using capacitor http request
    const options = {
      url: "https://expactivation.app/api/v4/login",
      headers: { "Content-Type": "application/json" },
      data: customerData,
    };
    const response = await CapacitorHttp.post(options);
    const token = response.data.token;
    if (token && response.status === 200) {
      setLoading(false);
      localStorage.setItem("token", token);
      localStorage.removeItem("latitude");
      localStorage.removeItem("longitude");
      navigate("/homePage");
      toast.success("Login successful!");
    } else {
      setLoading(false);
      toast.error("Incorrect credentials!");
    }
  };

  return (
    <div>
      <div className="text-white flex flex-col gap-4 mt-2 w-[90%] mx-auto">
        <input
          onChange={handleBpId}
          name="bp_id"
          required
          placeholder="BP ID"
          type="text"
          className="w-full text-center font-light italic text-black shadow-slate-300 shadow-inner py-1.5 text-2xl  rounded-xl outline-none"
        ></input>
        <div className="relative w-fit">
          <input
            onChange={handlePassword}
            name="password"
            required
            placeholder="PASSWORD"
            type={passwordVisible ? "text" : "password"}
            className="w-full text-center italic font-light text-black shadow-slate-300 shadow-inner p-1.5 text-2xl font- rounded-xl outline-none"
          ></input>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}>
            {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </div>
        </div>


        <motion.button
          whileTap={{ scale: 0.9 }}

          onClick={userLogIn}
          className="btn mb-20 text-white text-xl font-bold border-none bg-gradient-to-r from-[#FF5454] to-[#E10000] py-2.5 rounded-xl outline-none"
        >
          LOG IN
        </motion.button>
      </div>
      <div>
        {
          loading ? <Spin className="text-white font-thin" tip="Signing in..." size="small">
            <div className="content" />
          </Spin> : <></>
        }
      </div>
    </div>
  );
};

export default SignIn;
