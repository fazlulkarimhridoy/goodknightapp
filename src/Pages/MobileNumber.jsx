import React, { useContext } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CapacitorHttp } from '@capacitor/core';
import { DataContext } from "../context/DataProvider";



const MobileNumber = () => {
    const { otp, setOtp } = useContext(DataContext);

    const token = localStorage.getItem('token');
    if (!token) {
        return window.location.href = "/signin";
    }

    // generate otp
    const handleOtpVerification = async () => {
        const numberString = '01634468473'
        const number = parseInt(numberString)
        console.log('number', number);
        const options = {
            url: 'https://goodknight.xri.com.bd/api/send-otp',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: { phone_number: numberString }
        };
        const response = await CapacitorHttp.post(options);
        console.log(response.data.otp);
        const otp = response.data.otp;
        // if (otp) {
        //     setOtp(otp)
        // }
        // if (response.status === 201 || 200) {
        //     localStorage.removeItem('token');
        //     window.location.href = "/signin";
        // }
        // else {
        //     console.log(response);
        // }
    }
    console.log(otp);

    return (
        <div className="bg-[#890000]">
            <Navbar></Navbar>
            <div className="container">
                <div className="pr-12 relative">
                    <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
                </div>
                <div className=" space-y-4 text-center mt-16">
                    <h1 className="text-white mt-4 text-2xl p-2">
                        Mobile no.
                    </h1>
                    <h1 className="text-white mt-4 text-2xl font-bold p-2">
                        01XXXXXXXXX
                    </h1>
                </div>

                <div className="my-8">
                    <Link to="/otp">
                        <Button title={'NEXT'}></Button>
                    </Link>
                </div>

                <div onClick={handleOtpVerification}>
                    <Button title={'Send Otp'} />
                </div>


            </div>
        </div>

    );
};

export default MobileNumber;
