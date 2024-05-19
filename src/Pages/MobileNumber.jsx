import React, { useContext, useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CapacitorHttp } from '@capacitor/core';
import { DataContext } from "../context/DataProvider";
import { motion } from "framer-motion";
import { Spin } from "antd";
import "../CSS/mobilenumber.css"
import toast from "react-hot-toast";

const MobileNumber = () => {
    const [loading, setLoading] = useState(false);
    const { customerData } = useContext(DataContext);
    const { phone_number } = customerData;
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    if (!token) {
        return window.location.href = "/signin";
    }

    // generate otp
    const handleOtpVerification = async () => {
        setLoading(true)
        const options = {
            url: 'https://expactivation.app/api/v5/send-otp',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: { phone_number: phone_number }
        };
        try {
            const response = await CapacitorHttp.post(options);
            const otp = response.data.otp;
            if (otp) {
                setLoading(false)
                localStorage.setItem('otp', otp);
                navigate('/otp')
            }
            else {
                setLoading(false);
                toast.error("Failed to send otp")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <motion.div initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            exit={{ x: -400, ease: "easeInOut" }} className="bg-[#890000]">
            <Navbar></Navbar>
            <div className="container">
                <div className="pr-12 relative">
                    <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
                </div>
                <div className=" space-y-4 text-center mt-16">
                    <h1 className="text-white mt-4 text-2xl p-2">
                        Mobile No.
                    </h1>
                    <h1 className="text-white mt-4 text-2xl font-bold p-2">
                        {phone_number}
                    </h1>
                </div>

                <div>
                    {
                        loading ? <Spin
                            size="small"
                        /> : <></>
                    }
                </div>

                <div onClick={handleOtpVerification} className={`${loading ? "mt-[152px]" : "mt-[176px]"}`}>
                    <Button title={'Send OTP'} />
                </div>


            </div>
        </motion.div>

    );
};

export default MobileNumber;
