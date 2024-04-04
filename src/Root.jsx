import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Network } from '@capacitor/network';
import { useEffect, useState } from "react";

const Root = () => {
  const location = useLocation();

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 1, duration: 0.5 }
    },
    exit: {
      x: '-100vw',
      transition: { ease: 'easeInOut' }
    }
  }


  return (
    <AnimatePresence mode="wait">

      <motion.div
        key={location.key}
        // variants={containerVariants}
        // initial="hidden"
        // animate="visible"
        // exit="exit"
        className="font-poppins bg-[#890000] h-screen select-none"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default Root;
