import React from "react";
import SignIn from "../components/SignIn";
import { motion } from "framer-motion";

const SignInPage = () => {

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      exit={{ x: -400, ease: "easeInOut" }}
      className="overflow-hidden bg-[#890000] pt-20 pb-10 flex flex-col items-center justify-center"
    >
      <div className="flex items-center justify-center pr-5">
        <img src="/images/LargeLogo.svg"></img>
      </div>
      <div className="text-center mt-10">
        <h4 className="text-white text-xl font-normal  ">
          Door to door sales activation
        </h4>
        <div className="mt-2">
          <SignIn />
        </div>
      </div>
    </motion.div>
  );
};

export default SignInPage;
