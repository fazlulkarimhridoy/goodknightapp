import React, { useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import OTPInput from "react-otp-input";
import Navbar from "../components/Navbar";



const OtpVerification = () => {

    const token = localStorage.getItem('token');
    if (!token) {
        return window.location.href = "/signin";
    }

    const [otp, setOtp] = useState(null);


    return (
        <>
            <Navbar></Navbar>
            <div className="bg-[#890000] flex flex-col items-center pt-[20px] h-dvh gap-4">
                <div className="pr-12 relative">
                    <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
                </div>
                <div className=" space-y-4 text-center mt-16">
                    <h1 className="text-white mt-4 text-2xl p-2">
                        Verification Code
                    </h1>

                </div>
                <div className="w-3/4 mx-auto">
                    <OTPInput
                        inputStyle={{ fontSize: "30px", fontWeight: "bold", borderRadius: "10px", width: "15%", margin: "auto" }}
                        placeholder="XXXX"
                        inputType="number"
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>

                <div className="mt-32">
                    <Link>
                        <Button title={'NEXT'}></Button>
                    </Link>
                </div>


            </div>
        </>
    );
};

export default OtpVerification;
