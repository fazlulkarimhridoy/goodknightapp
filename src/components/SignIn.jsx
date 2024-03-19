import axios from 'axios';
import React from 'react';
const SignIn = () => {

    // handle login
    const userLogIn = (e) => {
        e.preventDefault();
        const bp_id = e.target.bp_id.value;
        const password = e.target.password.value;
        axios.post('https://goodknight.xri.com.bd/api/login', { bp_id: bp_id, password: password })
            .then(res => {
                console.log(res.data);
                if (res.data.token) {
                    // alert('Logged in successfully')
                    localStorage.setItem('token', res.data.token);
                    window.location.href = '/homePage';
                }
                else {
                    console.log(res.data.message);
                    alert('Wrong credentials')
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <div>
            <form onSubmit={userLogIn} className='text-white flex flex-col gap-4 mt-10'>
                <input name='bp_id' required placeholder='BP ID' type='number' className=' text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none'></input>
                <input name='password' required placeholder='PASSWORD' type='password' className='text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none'></input>
                <button
                    type='submit'
                    className='btn text-white text-xl font-semibold border-none bg-gradient-to-r from-[#FF5454] to-[#E10000] py-4 rounded-xl outline-none'>
                    LOG IN
                </button>
            </form>
        </div>

    );
}

export default SignIn;