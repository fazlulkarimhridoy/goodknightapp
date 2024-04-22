import React from "react";
import { motion } from "framer-motion"

const Button = ({ title, func }) => {
  return (
    // animated button
    <motion.button
      whileTap={{ scale: 0.9 }}

      onClick={func}
      className="btn w-[300px] text-white text-xl font-bold border-none bg-gradient-to-r from-[#FF5454] to-[#E10000] py-2.5 rounded-xl outline-none"
    >
      {title}
    </motion.button>
  );
};

export default Button;
