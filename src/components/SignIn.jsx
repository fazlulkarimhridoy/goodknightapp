import React, { useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';



const SignIn = () => {
    // states
    const [bpId, setBpId] = useState(null);
    const [password, setPassword] = useState(null);

    // handle bp id
    const handleBpId = (e) => {
        console.log(e.target.value);
        setBpId(e.target.value);
    }
    // handle password
    const handlePassword = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    }

    // // handle location
    // const handleLocation = async () => {
    //     // track latitude and longitude
    //     const position = await Geolocation?.getCurrentPosition();
    //     const latitude = position?.coords?.latitude.toString();
    //     const longitude = position?.coords?.longitude.toString();
    //     const geoLocation = {latitude, longitude}
    //     return geoLocation;
    // }

    // handle login
    const userLogIn = async () => {

        const position = await Geolocation?.getCurrentPosition();
            const latitude = position?.coords?.latitude.toString();
            const longitude = position?.coords?.longitude.toString();

        const customerData = {
            bp_id: bpId,
            password: password,
            latitude: latitude,
            longitude: longitude
        }

        // post request using capacitor http request
        const options = {
            url: 'https://goodknight.xri.com.bd/api/login',
            headers: { 'Content-Type': 'application/json' },
            data: customerData
        };
        const response = await CapacitorHttp.post(options);
        const token = response.data.token;
        if (token && response.status === 200) {
            localStorage.setItem('token', token);
            window.location.href = '/homePage';
        }
        else {
            alert('BP ID or PASSWORD is incorrect')
        }
    }


    return (
        <div className='bg-[#890000]'>
            <div className='text-white flex flex-col gap-4 mt-10 w-3/4 mx-auto'>

                <input onChange={handleBpId} name='bp_id' required placeholder='BP ID' type='number' className=' text-center text-black shadow-gray-600 shadow-inner p-2.5 text-xl font-bold rounded-xl outline-none'></input>
                <input onChange={handlePassword} name='password' required placeholder='PASSWORD' type='password' className='text-center text-black shadow-gray-600 shadow-inner p-2.5 text-xl font-bold rounded-xl outline-none'></input>

            </div>
            <div className='w-3/4 mx-auto'>
                <button
                    onClick={userLogIn}
                    className='mt-5 btn-primary w-full text-white text-xl font-semibold border-none bg-gradient-to-r from-[#FF5454] to-[#E10000] py-2.5 rounded-xl outline-none'>
                    LOG IN
                </button>
            </div>
        </div>

    );
}

export default SignIn;