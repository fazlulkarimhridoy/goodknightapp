import React, { useContext } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../context/DataProvider";
import { CapacitorHttp } from '@capacitor/core';

const ConsumerForm = () => {

  const navigate = useNavigate();
  const { customerData, setCustomerData, handleChange } =
    useContext(DataContext);
  const { name, age, gender, phone_number } = customerData;
  console.log(customerData);

  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/signin");
  }


  const handleNumberCheck = async () => {

    // axios.post("https://goodknight.xri.com.bd/api/check-customer-number",{ 
    //     phone_number: phone_number },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     if (res.data.new_customer) {
    //       navigate('/buyproductstart');
    //     }
    //     else if (!res.data.new_customer) {
    //       navigate('/duplicateCustomer');
    //     }
    //     else {
    //       console.log(res.data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // post request using capacitor http request
    const options = {
      url: 'https://goodknight.xri.com.bd/api/check-customer-number',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: { phone_number: phone_number }
    };
    const response = await CapacitorHttp.post(options);
    const newCustomer = response.data.new_customer;
    if (newCustomer) {
      navigate('/buyproductstart');
    }
    else if (!newCustomer) {
      navigate('/duplicateCustomer');
    }
    else {
      console.log(response.data.message);
    }

    // fetch('https://goodknight.xri.com.bd/api/check-customer-number', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({ phone_number: phone_number })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.new_customer) {
    //       navigate('/buyproductstart');
    //     }
    //     else if (!data.new_customer) {
    //       navigate('/duplicateCustomer');
    //     }
    //     else {
    //       console.log(data.message);
    //     }
    //   })
  };
  return (
    <div className="bg-[#890000]">
      <Navbar></Navbar>
      <div className="container">
        <div className="pr-12 relative">
          <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
        </div>
        <div className=" space-y-4 text-center">
          <h1 className="text-white mt-4 text-2xl p-2">
            Consumer’s information
          </h1>
        </div>

        {/* Input Box ................. */}
        <form >
          <div className="flex flex-col gap-2">
            <div>
              <input
                value={name}
                onChange={handleChange}
                name="name"
                required
                placeholder="name"
                type="text"
                className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
              ></input>
            </div>
            <div>
              <input
                value={age}
                onChange={handleChange}
                name="age"
                required
                placeholder="age"
                type="number"
                className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
              ></input>
            </div>
            <div className="arrow">
              <select
                value={gender}
                onChange={handleChange}
                name="gender"
                required
                id="product"
                className=" w-[220px] text-center text-black shadow-slate-300 shadow-inner  py-2 text-2xl font-semibold rounded-xl outline-none bg-[#D9D9D9]"
              >
                <option disabled className="text-xl" value="coil">
                  Gender
                </option>
                <option className="text-xl" value="saab">
                  Male
                </option>
                <option className="text-xl" value="mercedes">
                  Female
                </option>
              </select>
            </div>
            <div>
              <input
                value={phone_number}
                onChange={handleChange}
                name="phone_number"
                required
                placeholder="mobile"
                type="number"
                className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
              ></input>
            </div>
          </div>
        </form>
        {
          (name?.length === 0 || age?.length === 0 || gender?.length === 0 || phone_number?.length === 0) ? <div className="mt-8">
            <Button title={"NEXT"}></Button>
          </div>
            :
            <div onClick={handleNumberCheck} className="my-8">
              <Button title={"NEXT"}></Button>
            </div>
        }
        {
          (name?.length === 0 && <div className="text-white">name is required</div>) || (age?.length === 0 && <div className="text-white">age is required</div> || (gender?.length === 0 && <div className="text-white">gender is required</div>) || (name?.phone_number && <div className="text-white">number is required</div>))
        }

      </div >
    </div>
  );
};

export default ConsumerForm;
