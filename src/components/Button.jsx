import React from "react";

const Button = ({title}) => {
  return (
    
      <button className="w-[300px] text-white text-xl font-bold border-none bg-gradient-to-r from-[#FF5454] to-[#E10000] py-2 rounded-xl outline-none">
        {title}
      </button>
    
  );
};

export default Button;
