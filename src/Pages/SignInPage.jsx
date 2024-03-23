import React from 'react';
import Logo from '../components/Logo';
import SignIn from '../components/SignIn';

const SignInPage = () => {
    return (
        <div className="overflow-hidden bg-[#890000] flex flex-col items-center justify-center">
            <div className="flex items-center justify-center flex-col mt-52 ">
                <Logo />
            </div>
            <div className="text-center mt-5">
                <h4 className="text-white text-base font-normal  ">
                    Door to door sales activation
                </h4>
                <div className='mt-10'>
                    <SignIn />
                </div>

            </div>
        </div>
    );
}

export default SignInPage;