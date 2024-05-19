import React, { useContext, useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { CapacitorHttp } from "@capacitor/core";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Spin } from "antd";
import "../CSS/consumerform.css"

const ConsumerForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { customerData, handleChange } = useContext(DataContext);
  const { name, age, gender, phone_number } = customerData;

  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/signin");
  }

  const handleNumberCheck = async () => {
    setLoading(true)
    const validationErrors = {};

    if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      setLoading(false)
      validationErrors.name = "Name must contain only letters";
    }

    if (!age || isNaN(age) || parseInt(age) <= 18) {
      setLoading(false)
      validationErrors.age = "Age must be a 18+";
    }

    if (!/^(01)[0-9]{9}$/.test(phone_number)) {
      setLoading(false)
      validationErrors.number = "invalid number"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // setLoading(false)
      return;
    } else {
      setErrors({});
    }

    // post request using capacitor http request
    const options = {
      url: "https://expactivation.app/api/v5/check-customer-number",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { phone_number: phone_number },
    };
    const response = await CapacitorHttp.post(options);
    const newCustomer = response?.data.new_customer;
    if (newCustomer === true) {
      setLoading(false);
      navigate("/buyproductstart");
    } else if (newCustomer === false) {
      setLoading(false);
      navigate("/duplicateCustomer");
    }
    else {
      setLoading(false);
    }
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      exit={{ x: -400, ease: "easeInOut" }}
      className="bg-[#890000]"
    >
      <Navbar></Navbar>
      <div className="container">
        <div className="pr-12 relative">
          <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
        </div>
        <div className="text-center">
          <h1 className="text-white text-xl">Consumer’s information</h1>
        </div>

        {/* Input Box ................. */}
        <form>
          <div className="flex flex-col gap-2">
            <div className="">
              <label className="text-white" for="name">
                Name
              </label>{" "}
              <br />
              <input
                value={name}
                onChange={handleChange}
                name="name"
                required
                placeholder="name"
                type="text"
                className="mt-1 w-[300px] truncate py-1 text-center  text-black  shadow-inner shadow-[#00000080]  px-12 text-2xl font-normal rounded-xl outline-none bg-[#D9D9D9]"
              ></input>
              {errors.name && (
                <p className="max-w-[300px] pt-2 text-sm" style={{ color: "yellow" }}>
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="text-white" for="Age">
                Age
              </label>{" "}
              <br />
              <input
                value={age}
                onChange={handleChange}
                name="age"
                required
                placeholder="age"
                type="number"
                className="mt-1 w-[300px] truncate py-1 text-center  text-black  shadow-inner shadow-[#00000080]  px-12 text-2xl font-normal rounded-xl outline-none bg-[#D9D9D9]"
              ></input>
              {errors.age && (
                <p className="max-w-[300px] pt-2 text-sm" style={{ color: "yellow" }}>
                  {errors.age}
                </p>
              )}
            </div>
            <div className="arrow">
              <label className="text-white" for="gender">
                Gender
              </label>{" "}
              <br />
              <select
                defaultValue="gender"
                style={styles.select}
                onChange={handleChange}
                name="gender"
                required
                id="product"
                placeholder="gender"
                className="mt-1 w-[300px] truncate py-[2px] text-center  text-black  shadow-inner shadow-[#00000080]  text-2xl font-normal rounded-xl outline-none bg-[#D9D9D9]"
              >
                <option disabled className="text-xl" value="gender">
                  gender
                </option>
                <option className="text-xl" value="male">
                  Male
                </option>
                <option className="text-xl" value="female">
                  Female
                </option>
              </select>
            </div>
            <div>
              <label className="text-white" for="phone_number">
                Phone Number
              </label>{" "}
              <br />
              <input
                value={phone_number}
                onChange={handleChange}
                name="phone_number"
                required
                placeholder="mobile"
                type="number"
                className="mt-1 w-[300px] truncate py-1 text-center  text-black  shadow-inner shadow-[#00000080]  px-12 text-2xl font-normal rounded-xl outline-none bg-[#D9D9D9]"
              ></input>
              {errors.number && (
                <p className="max-w-[300px] pt-2 text-sm" style={{ color: "yellow" }}>
                  {errors.number}
                </p>
              )}
            </div>
          </div>
        </form>
        {name?.length === 0 ||
          age?.length === 0 ||
          gender?.length === 0 ||
          phone_number?.length === 0 ? (
          <div className="mt-8">
            <Button title={"NEXT"}></Button>
          </div>
        ) : (
          <div onClick={handleNumberCheck} className="my-8">
            <Button title={"NEXT"}></Button>
          </div>
        )}
        {(name?.length === 0 && (
          <div className="text-white">name is required</div>
        )) ||
          (age?.length === 0 && (
            <div className="text-white">age is required</div>
          )) ||
          (gender?.length === 0 && (
            <div className="text-white">gender is required</div>
          )) ||
          (phone_number.length === 0 && phone_number.length !== 11 && (
            <div className="text-white">number is required</div>
          ))}
      </div>
      <div className="">
        {
          loading ? <Spin className="text-white font-thin" tip="checking number..." size="small">
            <div className="content" />
          </Spin> : <></>
        }
      </div>
    </motion.div>
  );
};

export default ConsumerForm;
