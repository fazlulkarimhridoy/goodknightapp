import React, { useContext, useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import successIcon from "../../public/images/successIcon.svg"
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer } from "antd";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { DataContext } from "../context/DataProvider";
import { motion } from "framer-motion";

const SuccessPage = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (!token) {
    return window.location.href = "/signin";
  }

  const { customerData } = useContext(DataContext);

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

    const options = {
      url: 'https://expactivation.app/api/v4/logout',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await CapacitorHttp.post(options);
    if (response.status === 201 || 200) {
      localStorage.removeItem('token');
      navigate("/signin");
      toast.success('Successfully logged out!')

    }
    else {
      console.log(response);
    }
  }

  // handle home
  const handleToHome = () => {
    window.location.reload();
    window.location.href = "/homePage";
  }


  // redirect to home page
  const redirectHome = () => {
    window.location.reload();
    window.location.href = "/homePage";
  };

  return (
    <motion.div initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      exit={{ x: -400, ease: "easeInOut" }}>
      {/* hamburger menu */}
      <div className="bg-[#890000] flex justify-end px-6 py-3.5">
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

      <div className="container bg-[#890000]">
        <div className="pr-14 relative mt-5">
          <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
        </div>
        <div className="text-center mt-14 space-y-4">
          <img width={120} src={successIcon}></img>
          <p className="text-2xl text-white">Successful</p>
        </div>
        <div onClick={redirectHome} className="mt-28">
          <Button title={"HOME"}></Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SuccessPage;
