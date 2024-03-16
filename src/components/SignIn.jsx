import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const userLogIn = {
        bp_id: "",
        password: ""
    }
    return (
        <div className='text-white flex flex-col gap-4 mt-10'>
            <input placeholder='BP ID' type='text' className=' text-center text-black shadow-slate-300 shadow-inner p-2 text-xl rounded-xl'></input>
            <input placeholder='PASSWORD' type='password' className=' text-center text-black shadow-slate-300 shadow-inner p-2 text-xl rounded-xl'></input>
            <Link to="/homePage">
                <button className="w-full bg-gradient-to-r from-[#FF5454] to-[#E10000] text-white text-xl font-bold px-20 py-2 rounded-xl shadow-xl">
                    LOG IN
                </button>
            </Link>
        </div>

    );
}

export default SignIn;
