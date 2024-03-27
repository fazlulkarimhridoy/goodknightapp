import { GiHamburgerMenu } from "react-icons/gi";
import profile from "../assets/profile.png";
import logo from "../../public/images/profilegoodknigtlogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, Spin } from "antd";
import { useState } from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import "../CSS/Navbar.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import { CapacitorHttp } from "@capacitor/core";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/signin");
  }

  const [open, setOpen] = useState(false);
  const [placement] = useState("right");
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
    //         Authorization: `Bearer ${token}`
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

    const options = {
      url: "https://goodknight.xri.com.bd/api/logout",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await CapacitorHttp.post(options);
    console.log(response);
    if (response.status === 201 || 200) {
      localStorage.removeItem("token");
      navigate("/signin");
      toast.success("Successfully logged out!");
    } else {
      console.log(response);
    }
  };

  // handle home
  const handleToHome = () => {
    window.location.reload();
    window.location.href = "/homePage";
  };

  // handle bp info
  const {
    data: bpInfo = {},
    isLoading,
    isFetching,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["bpInfo"],
    queryFn: async () => {
      const res = await axios.get("https://goodknight.xri.com.bd/api/bp_info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });

  // show loader
  if (isLoading || isFetching || isPending) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 35,
                color: "white",
              }}
              spin
            />
          }
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      exit={{ x: -400, ease: "easeInOut" }}
      className=" bg-white ]"
    >
      {/* hamburger menu */}
      <div className="bg-[#BA0012] flex justify-end px-6 py-3.5 ">
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
          <div
            onClick={handleToHome}
            className="flex items-center gap-4 text-xl"
          >
            <FaHome color="white" />
            <p className="text-white">Home</p>
          </div>
          <hr className="w-full border border-solid border-[#FF283D] shadow-black shadow-2xl my-2"></hr>
          <div
            onClick={handleSignout}
            className="flex items-center gap-4 text-xl"
          >
            <FaSignOutAlt color="white" />
            <p className="text-white">Logout</p>
          </div>
          <hr className="w-full border border-solid border-[#FF283D] shadow-black shadow-2xl my-2"></hr>
        </Drawer>
      </div>

      {/* profile information */}
      <div className="bg-[#BA0012] text-white flex items-center justify-between py-4 px-6">
        <div className="flex items-start gap-1">
          <img
            className="w-20 rounded-full"
            src={profile}
            alt="profile_picture"
          />
          <div>
            <h3 className="font-bold truncate overflow-hidden">Welcome !</h3>
            <h4 className="text-xs font-medium mt-2 truncate overflow-hidden">
              {bpInfo?.name}
            </h4>
            <h4 className="text-xs font-medium mt-1 truncate overflow-hidden">
              BP ID: {bpInfo?.bp_id}
            </h4>
          </div>
        </div>
        <img src={logo} alt="logo" />
      </div>
      <hr className="border border-solid border-[#FF283D] shadow-black shadow-2xl mb-5"></hr>
      {/* user informations display */}
      <div className="max-w-[500px] mx-auto">
        <div className="flex items-center justify-around pl-10 pr-4">
          <div className="flex flex-col items-center text-center">
            <svg
              width="40"
              height="64"
              viewBox="0 0 40 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_49_518)">
                <path
                  d="M25.4943 35.9514L25.4944 35.9514L34.7709 37.2994L34.6271 38.289L34.7709 37.2994C36.7308 37.5842 37.514 39.993 36.0952 41.3757L29.3828 47.9188L29.3827 47.9189C29.2909 48.0084 29.249 48.1373 29.2707 48.2636L29.2707 48.2638L30.8553 57.5028L29.8697 57.6719L30.8553 57.5028C31.1902 59.4552 29.1409 60.9436 27.3879 60.0221L27.3878 60.0221L19.0907 55.6599C18.9772 55.6003 18.8415 55.6002 18.728 55.6599C18.7279 55.6599 18.7279 55.6599 18.7278 55.6599L10.4307 60.0221L10.4306 60.0221C8.67767 60.9436 6.62837 59.4552 6.9632 57.5028L7.94881 57.6719L6.9632 57.5028L8.54782 48.2638L8.54786 48.2636C8.56953 48.1373 8.52768 48.0084 8.4358 47.9189L8.43571 47.9188L1.72332 41.3757C0.304574 39.993 1.08776 37.5842 3.04766 37.2994L3.04768 37.2994L12.3241 35.9514L12.3242 35.9514C12.451 35.933 12.5608 35.8533 12.6177 35.7381L25.4943 35.9514ZM25.4943 35.9514C25.3675 35.933 25.2577 35.8533 25.2008 35.7381L21.0522 27.3322C21.0522 27.3322 21.0522 27.3322 21.0522 27.3322C20.1756 25.5559 17.6429 25.5559 16.7663 27.3322C16.7663 27.3322 16.7663 27.3322 16.7663 27.3322L12.6177 35.7381L25.4943 35.9514Z"
                  fill="#FFBD70"
                  stroke="#EAEAEA"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M36.9999 2C36.9999 1.44772 36.5522 1 35.9999 1H2.1814C1.62911 1 1.1814 1.44772 1.1814 2V16.0911C1.1814 16.4948 1.42413 16.8589 1.79678 17.0141L18.706 24.0597C18.9522 24.1622 19.2291 24.1622 19.4753 24.0597L36.3845 17.0141C36.7572 16.8589 36.9999 16.4948 36.9999 16.0911V2Z"
                  fill="#343434"
                  stroke="#EAEAEA"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_49_518"
                  x="-0.00219727"
                  y="0"
                  width="40.0021"
                  height="63.3041"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="2" dy="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_49_518"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_49_518"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <h3 className="text-xl font-bold">
              Today’s
              <br />
              Summery
            </h3>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="flex items-center  p-2 gap-2 rounded-xl w-full">
              <div className="bg-white p-2 rounded-lg">
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.641846 0H28.7509V28.109H0.641846V0Z"
                    fill="white"
                    fill-opacity="0.01"
                  />
                  <path
                    d="M0.641846 0H28.7509V28.109H0.641846V0Z"
                    fill="white"
                    fill-opacity="0.01"
                  />
                  <path
                    d="M25.1083 12.0673C25.2563 11.0743 25.2078 10.0576 24.9626 9.08003C24.6388 7.78866 23.972 6.56568 22.9621 5.55581C21.9522 4.54594 20.7292 3.8791 19.4379 3.55529C18.4604 3.31017 17.4436 3.26162 16.4506 3.40965"
                    stroke="#FF283D"
                    stroke-width="2.34242"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.6635 11.597C20.8221 10.5332 20.492 9.41061 19.673 8.5917C18.8541 7.77279 17.7315 7.44257 16.6677 7.60115"
                    stroke="#FF283D"
                    stroke-width="2.34242"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.06036 5.14995C9.4858 5.14995 9.8778 5.38072 10.0843 5.75269L11.517 8.33334C11.7045 8.67123 11.7134 9.07992 11.5405 9.42561L10.1604 12.1859C10.1604 12.1859 10.5603 14.2423 12.2342 15.9162C13.9082 17.59 15.9576 17.9831 15.9576 17.9831L18.7174 16.6032C19.0634 16.4302 19.4724 16.4392 19.8104 16.6271L22.3983 18.0659C22.77 18.2725 23.0004 18.6643 23.0004 19.0895V22.0606C23.0004 23.5736 21.5951 24.6664 20.1614 24.1827C17.2171 23.1892 12.6466 21.2976 9.74973 18.4006C6.8528 15.5038 4.96118 10.9333 3.9677 7.98894C3.48397 6.55532 4.57676 5.14995 6.08976 5.14995H9.06036Z"
                    fill="#FF283D"
                  />
                </svg>
              </div>
              <p className="text-center text-white">
                <span className="text-xs">Contact</span>
                <br />
                <span className="text-xl font-bold">
                  {bpInfo?.today_summery?.today_contact}
                </span>
              </p>
            </div>
            <div className="flex items-center bg-[#890000] p-2 gap-2 rounded-xl w-full">
              <div className="bg-white p-[11px] rounded-lg">
                <svg
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 12C17.6568 12 19.1568 11.3284 20.2426 10.2426C21.3284 9.15685 22 7.65685 22 6.00001C22 4.34317 21.3284 2.84317 20.2426 1.75737C19.1568 0.671582 17.6568 7.62939e-06 16 7.62939e-06C14.3432 7.62939e-06 12.8432 0.671582 11.7574 1.75737C10.6716 2.84317 10 4.34317 10 6.00001C10 7.65685 10.6716 9.15685 11.7574 10.2426C12.8432 11.3284 14.3432 12 16 12Z"
                    fill="#890000"
                  />
                  <path
                    d="M13 6.00001L15 8.00001L19 4.00001"
                    stroke="white"
                    stroke-width="1.78435"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.20855 3.14996C5.63399 3.14996 6.026 3.38072 6.23254 3.7527L7.66516 6.33334C7.85273 6.67124 7.86158 7.07993 7.6887 7.42561L6.30855 10.1859C6.30855 10.1859 6.70852 12.2423 8.38241 13.9162C10.0564 15.5901 12.1057 15.9831 12.1057 15.9831L14.8656 14.6032C15.2116 14.4302 15.6205 14.4392 15.9586 14.6271L18.5465 16.0659C18.9182 16.2725 19.1486 16.6643 19.1486 17.0896V20.0606C19.1486 21.5736 17.7432 22.6664 16.3096 22.1827C13.3653 21.1892 8.79479 19.2976 5.89792 16.4007C3.001 13.5038 1.10938 8.93331 0.115891 5.98895C-0.367836 4.55533 0.724955 3.14996 2.23795 3.14996H5.20855Z"
                    fill="#890000"
                  />
                </svg>
              </div>
              <p className="text-center text-white">
                <span className="text-xs">Pro. Call</span>
                <br />
                <span className="text-xl font-bold">
                  {bpInfo?.today_summery?.today_pro_call}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* total history */}
        <div className="mt-10 mx-8 py-6 rounded-xl shadow-gray-400 shadow-inner bg-[#FFE2E2]">
          <h2 className="font-bold text-center">Total History</h2>
          <div className="flex items-center justify-between px-5 mt-5">
            <div className="px-5">
              <div className="border-l-8 border-[#D50015]">
                <div className="pl-2 truncate overflow-hidden">
                  <span>Contact</span>
                  <br />
                  <span className="text-2xl font-bold">
                    {bpInfo?.total_history?.total_contact}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-5">
              <div className="border-l-8 border-[#D50015]">
                <div className="pl-2 truncate overflow-hidden">
                  <span>Pro. Call</span>
                  <br />
                  <span className="text-2xl font-bold">
                    {bpInfo?.total_history?.total_pro_call}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* activity */}
        <div className="px-8 mt-10">
          <h2 className="text-sm font-bold">Activity KPI</h2>
          <div className="flex items-center justify-between mt-3 gap-3">
            <div className="bg-[#FFC5C5] shadow-gray-400 shadow-inner flex flex-col items-center gap-2 p-3 rounded-xl w-full">
              <h4 className="text-[10px] font-bold text-center">
                Avg. Visit
                <br />
                Per Day
              </h4>
              <h2 className="text-xl font-bold bg-white shadow-gray-400 shadow-md px-4 py-2 rounded-lg text-center">
                27
              </h2>
            </div>
            <div className="bg-[#49FFC8] shadow-gray-400 shadow-inner flex flex-col items-center gap-2 p-3 rounded-xl w-full">
              <h4 className="text-[10px] font-bold text-center">
                Total Field
                <br />
                Days
              </h4>
              <h2 className="text-xl font-bold bg-white shadow-gray-400 shadow-md px-4 py-2 rounded-lg text-center">
                12
              </h2>
            </div>
            <div className="bg-[#FFBD70] shadow-gray-400 shadow-inner flex flex-col items-center gap-2 p-3 rounded-xl w-full">
              <h4 className="text-[10px] font-bold text-center">
                Non Field
                <br />
                Days
              </h4>
              <h2 className="text-xl font-bold bg-white shadow-gray-400 shadow-md px-4 py-2 rounded-lg text-center">
                5
              </h2>
            </div>
          </div>
        </div>

        <div className="p-10 bg-white flex items-center justify-center">
          <Link to="/usedproduct">
            <Button title={"ADD CONSUMER"}></Button>
          </Link>
        </div>
      </div>
      {/* summery section */}
    </motion.div>
  );
};

export default HomePage;
