import React, { useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Spin } from "antd";
import "../CSS/otp.css"

const OtpVerification = () => {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    if (!token) {
        return window.location.href = "/signin";
    }
    // console.log(localStorage.getItem("otp"));


    // handle otp varification
    const handleVerification = (e) => {
        e.preventDefault();
        setLoading(true);

        if (otp === null) {
            setLoading(false);
            return toast.error("Please enter OTP");
        }

        const otpFromLocalStorage = localStorage.getItem('otp');
        if (otpFromLocalStorage === otp) {
            setLoading(false)
            localStorage.removeItem('otp')
            navigate('/takeimage')
        }
        else {
            setLoading(false)
            toast.error('Invalid otp!')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleVerification(e);

        }
    };


    return (
        <motion.div initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            exit={{ x: -400, ease: "easeInOut" }} className="bg-[#890000] select-none">
            <Navbar></Navbar>
            <div className="container">
                <div className="pr-12 relative">
                    <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
                </div>
                <div className=" space-y-4 text-center mt-16">
                    <h1 className="text-white mt-4 text-2xl p-2">
                        Verification Code
                    </h1>

                </div>
                <form onSubmit={handleVerification} className="w-3/4 mx-auto">
                    <OTPInput
                        inputStyle={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            borderRadius: "10px",
                            width: "15%",
                            margin: "auto",
                        }}
                        placeholder="XXXX"
                        inputType="number"
                        value={otp}
                        onChange={setOtp}
                        onKeyDown={handleKeyDown}
                        numInputs={4}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} />}
                    />
                    <div className="mt-4">
                        {
                            loading ? <Spin
                                size="small"
                            /> : <></>
                        }
                    </div>
                    <div onClick={handleVerification} className="mt-40">
                        {/* <Button  title={"NEXT"}></Button> */}
                        <motion.button whileTap={{ scale: 0.9 }} type="submit" className="btn w-[300px] text-white text-xl font-bold border-none bg-gradient-to-r from-[#FF5454] to-[#E10000] py-2.5 rounded-xl outline-none">NEXT</motion.button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default OtpVerification;
