import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";



const AmountCalculation = () => {

    const token = localStorage.getItem('token');
    if (!token) {
        return window.location.href = "/signin";
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="container">
                <div className="pr-12 relative">
                    <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
                </div>
                <div className=" space-y-4 text-center">
                    <h1 className="text-white mt-2 text-2xl p-2">
                        Select quantity
                    </h1>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <button className="btn-primary w-14 h-14">1</button>
                    <h1 className="text-white text-2xl">or</h1>
                    <button className="btn-primary w-14 h-14">2</button>
                </div>

                <div className="mt-3">
                    <h1 className="text-white text-2xl text-center">Total savings</h1>
                    <input
                        disabled
                        placeholder="Auto Calculation"
                        type="number"
                        className="w-[220px] bg-[#D9D9D9] mt-5 italic text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
                    ></input>
                </div>

                <div>
                    <h4 className="text-white text-xs">
                        • MRP. Per Unit BDT 149/-
                        <br />
                        • Discounted MRP. BDT 115/-
                    </h4>
                </div>

                <h2 className="text-white text-4xl font-bold">
                    BDT 560/-
                </h2>

                <div className="my-4">
                    <Link to="/number">
                        <Button title={'NEXT'}></Button>
                    </Link>
                </div>


            </div>
        </>

    );
};

export default AmountCalculation;
