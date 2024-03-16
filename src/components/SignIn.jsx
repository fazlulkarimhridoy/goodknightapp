import React from 'react';

const SignIn = () => {
    const userLogIn = {
        bp_id: "",
        password: ""
    }
    return (
        <div className='text-white flex flex-col gap-4 mt-10'>
            <input placeholder='BP ID'  type='text' className=' text-center text-black shadow-slate-300 shadow-inner p-2 text-xl rounded-xl'></input>
            <input placeholder='PASSWORD'  type='password' className=' text-center text-black shadow-slate-300 shadow-inner p-2 text-xl rounded-xl'></input>
            <button className='btn text-white text-xl font-semibold border-none bg-gradient-to-r from-[#FF5454] to-[#E10000] py-2 rounded-xl'>LOG IN</button>
        </div>

    );
}

export default SignIn;
