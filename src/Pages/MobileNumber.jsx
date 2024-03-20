import React from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";



const MobileNumber = () => {

    const token = localStorage.getItem('token');
    if (!token) {
        return window.location.href = "/signin";
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="container h-dvh">
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


            </div>
        </>

    );
};

export default MobileNumber;
