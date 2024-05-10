import React, { useContext } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { DataContext } from "../context/DataProvider";
import { motion } from "framer-motion";

const ConsumedProductName = () => {
  const { customerData, handleChange } = useContext(DataContext);

  const { previous_used_brand } = customerData;

  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/signin");
  }

  const styles = {
    select: {
      // Remove default arrow from select tag
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
      // Add custom arrow background
      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'%23333333\'%3E%3Cpath d=\'M7 7l3-3 3 3m0 6l-3 3-3-3\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 15px top 50%',
      backgroundSize: '14px',
      paddingRight: '15px', // Ensure enough space for the custom arrow
    },
  };

  const coilBrands = [
    "Eagle Max",
    "Eagle Shooter",
    "Express",
    "RAK",
    "Baoma",
    "Baoma lemon",
    "Baoma No Smoke",
    "Jonaki Black",
    "Jonaki Red",
    "Finis Max jumbo",
    "Night Guard",
    "Super fighter King Red",
    "Super fighter King Violet",
    "Reco",
    "Titash",
    "Obhijan",
    "Magic Black",
    "Magic Red",
    "SMC Super King",
    "Kite",
    "Patabahar",
    "535",
    "coil",
    "Attack",
    "king",
    "Jonaki",
    "Lock",
    "Down",
    "Master",
    "Coil",
    "Neam",
    "Xtream",
    "Boss",
    "Super",
    "New",
    "Solar",
    "Eagle",
    "Max",
    "Magic",
    "Sonali"
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }} exit={{ x: -400, ease: "easeInOut" }} className="bg-[#890000]">
      <Navbar></Navbar>
      <div className="bg-[#890000]">
        <div className="container">
          <div className="pr-12 relative">
            <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
          </div>
          <div className=" space-y-4 text-center">
            <h1 className="text-white mt-4 text-2xl p-2">Brand name ?</h1>
          </div>
          <div className="arrow">
            <label className="text-white" for="product-list">
              Product List
            </label>{" "}
            <br />
            <motion.select
              style={styles.select}
              whileTap={{ scale: 0.9 }}
              onChange={handleChange}
              defaultValue={previous_used_brand ? previous_used_brand : "product list"}
              name="previous_used_brand"
              id="product"
              className="mt-1 w-[300px] truncate shadow-inner shadow-[#00000080] py-1 px-2 font-normal text-center text-black   text-2xl  rounded-xl outline-none bg-[#D9D9D9]"
            >
              <option disabled className="text-xl" value="product list">
                Product List
              </option>
              {
                coilBrands.map((brand) => (
                  <option className="text-xl" value={brand}>
                    {brand}
                  </option>
                ))
              }
            </motion.select>
          </div>
          <div className="arrow">
            <label className="text-white" for="others">
              Others
            </label>{" "}
            <br />
            <motion.input
              whileTap={{ scale: 0.9 }}
              onChange={handleChange}
              name="previous_used_brand"
              placeholder="Type here"
              type="text"
              className="w-[300px] truncate placeholder:italic placeholder:font-normal bg-[#D9D9D9] placeholder:text-xl text-center pb-2 text-black shadow-slate-300 shadow-inner py-1.5 text-2xl font-normal rounded-xl outline-none"
            ></motion.input>
          </div>

          {previous_used_brand?.length === 0 ? (
            <div className="mt-28">
              <Link to="">
                <Button title={"NEXT"}></Button>
              </Link>

              <p className="text-white text-center p-2">Please select</p>
            </div>
          ) : (
            <div className="mt-28">
              <Link to="/video">
                <Button title={"NEXT"}></Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ConsumedProductName;
