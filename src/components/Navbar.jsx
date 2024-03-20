import { Drawer } from "antd";
import { CapacitorHttp } from '@capacitor/core';
import { useState } from "react";
import { FaArrowLeft, FaHome, FaSignOutAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return (window.location.href = "/signin");
    }
    const [open, setOpen] = useState(false);
    const [placement] = useState('right');
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    // handle signout
    const handleSignout = async () => {
        // axios.post('https://goodknight.xri.com.bd/api/logout', {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // })
        //     .then(res => {
        //         console.log(res.data);
        //     })
        // localStorage.removeItem('token');
        // window.location.reload();
        // window.location.href = "/signin";

        // fetch('https://goodknight.xri.com.bd/api/logout', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         localStorage.removeItem('token');
        //         window.location.reload();
        //         window.location.href = "/signin";
        //     })

        // post request using capacitor http request
        const options = {
            url: 'https://goodknight.xri.com.bd/api/logout',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await CapacitorHttp.post(options);
        if (response.status == 200) {
            localStorage.removeItem('token');
            window.location.reload();
            window.location.href = "/signin";
        }
    }

    // handle home
    const handleToHome = () => {
        window.location.reload();
        window.location.href = "/homePage";
    }

    return (
        <div className="bg-[#890000] flex items-center justify-between px-6 pt-5">
            {/* back button */}
            <FaArrowLeft size={25} color="white" onClick={() => window.history.back()} />

            {/* hamburger menu */}
            <GiHamburgerMenu onClick={showDrawer} size={25} color="white" />
            <Drawer
                closeIcon={true}
                width={250}
                placement={placement}
                onClose={onClose}
                open={open}
                key={placement}
                style={{ backgroundColor: "#303030", opacity: "95%" }}
            >
                <div onClick={handleToHome} className="flex items-center gap-4 text-xl">
                    <FaHome color="white" />
                    <p className="text-white">Home</p>
                </div>
                <hr className="w-full border border-solid border-[#FF283D] shadow-black shadow-2xl my-2"></hr>
                <div onClick={handleSignout} className="flex items-center gap-4 text-xl">
                    <FaSignOutAlt color="white" />
                    <p className="text-white">Logout</p>
                </div>
                <hr className="w-full border border-solid border-[#FF283D] shadow-black shadow-2xl my-2"></hr>
            </Drawer>
        </div>
    );
};

export default Navbar;