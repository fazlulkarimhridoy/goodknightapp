import React from "react";
import Logo from "../components/Logo";
import SignIn from "../components/SignIn";
import { motion } from "framer-motion";

const SignInPage = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 0.5 }
    },
    exit: {
      x: '-100vw',
      transition: { ease: 'easeInOut' }
    }
  }
  return (
    <motion.div

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
