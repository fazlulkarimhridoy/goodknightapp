import React from "react";
import Logo from "../components/Logo";
import { FaArrowDown } from "react-icons/fa";
import Button from "../components/Button";
import { Link } from "react-router-dom";



const MobileNumber = () => {
    return (
        <div className="bg-[#890000] flex flex-col items-center pt-[50px] h-dvh gap-4">
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

            <div className="mt-32">
                <Link to="/otp">
                    <Button title={'NEXT'}></Button>
                </Link>
            </div>


        </div>
    );
};

export default MobileNumber;
