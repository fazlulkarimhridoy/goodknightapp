import { Drawer } from "antd";
import { CapacitorHttp } from '@capacitor/core';
import { useContext, useState } from "react";
import { FaArrowLeft, FaHome, FaSignOutAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { motion } from "framer-motion"
import { DataContext } from "../context/DataProvider";

const Navbar = () => {
    const navigate = useNavigate();
    const { removeData } = useContext(DataContext);
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


        // post request using capacitor http request
        const options = {
            url: 'https://expactivation.app/api/v4/logout',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await CapacitorHttp.post(options);
        if (response.status == 201 || 200) {
            toast.success('Successfully logged out!')
            localStorage.removeItem('token');
            removeData();
            navigate("/signin");
        }
    }

    // handle home
    const handleToHome = () => {
        window.location.reload();
        removeData();
        window.location.href = "/homePage";
    }

    return (
        <div className="bg-[#890000] flex items-center justify-between px-6 pt-5">
            {/* back button */}
            <motion.span whileTap={{ scale: 0.9 }}><FaArrowLeft size={25} color="white" onClick={() => window.history.back()} /></motion.span>

            {/* hamburger menu */}
            <motion.span whileTap={{ scale: 0.9 }}><GiHamburgerMenu onClick={showDrawer} size={25} color="white" /></motion.span>

            <Drawer
                closeIcon={true}
                width={250}
                placement={placement}
                onClose={onClose}
                open={open}
                key={placement}
                style={{ backgroundColor: "#303030", opacity: "95%" }}
            >
                <motion.div whileTap={{ scale: 0.9 }} onClick={handleToHome} className="flex items-center gap-4 text-xl">
                    <FaHome color="white" />
                    <p className="text-white">Home</p>
                </motion.div>
                <hr className="w-full border border-solid border-[#FF283D] shadow-black shadow-2xl my-2"></hr>
                <motion.div whileTap={{ scale: 0.9 }} onClick={handleSignout} className="flex items-center gap-4 text-xl">
                    <FaSignOutAlt color="white" />
                    <p className="text-white">Logout</p>
                </motion.div>
                <hr className="w-full border border-solid border-[#FF283D] shadow-black shadow-2xl my-2"></hr>
            </Drawer>
        </div>
    );
};

export default Navbar;