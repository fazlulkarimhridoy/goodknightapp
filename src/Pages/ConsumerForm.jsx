import React from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";

const ConsumerForm = () => {
  return (
    <div className="container">
      <div className="pr-12 relative">
        <Logo width={"w-[136px]"} height={"h-[200px]"}></Logo>
      </div>
      <div className=" space-y-4 text-center">
        <h1 className="text-white mt-4 text-2xl p-2">Consumer’s information</h1>
      </div>

      {/* Input Box ................. */}

      <div className="flex flex-col gap-2">
        <div>
          <input
            placeholder="name"
            type="text"
            className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
          ></input>
        </div>
        <div>
          <input
            placeholder="age"
            type="number"
            className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
          ></input>
        </div>
        <div className="arrow">
          <select
            defaultValue={"coil"}
            name="product"
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
            placeholder="mobile"
            type="text"
            className="w-[220px] bg-[#D9D9D9] text-center text-black shadow-slate-300 shadow-inner p-2 text-2xl font-bold rounded-xl outline-none"
          ></input>
        </div>
      </div>
      <div className="mt-12">
        <Button title={"NEXT"}></Button>
      </div>
    </div>
  );
};

export default ConsumerForm;
