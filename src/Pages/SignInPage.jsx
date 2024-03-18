import React from 'react';
import Logo from '../components/Logo';
import SignIn from '../components/SignIn';
import { Link } from 'react-router-dom';

const SignInPage = () => {
    return (
        <div className='bg-[#890000] flex flex-col items-center pt-[50px] h-dvh'>
            <div className='pr-8 relative'>
                <Logo width={"w-[180px]"} height={"h-[200px]"}></Logo>
            </div>
            <div className=' space-y-4 text-center'>
                <h1 className='text-white mt-4 text-2xl'>POWER ACTIVE +</h1>
                <h3 className='text-white text-base'>Door to door sales activation</h3>
            </div>

            <div>
                <SignIn></SignIn>
            </div>

        </div>
    );
}

export default SignInPage;
