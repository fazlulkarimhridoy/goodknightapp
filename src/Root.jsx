import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Network } from '@capacitor/network';
import { useEffect, useState } from "react";

const Root = () => {
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(true);

  // checking network
  useEffect(() => {
    // Function to check network status
    const checkNetworkStatus = async () => {
      try {
        const status = await Network.getStatus();
        setIsConnected(status.connected);
      } catch (error) {
        console.error('Error checking network status:', error);
      }
    };

    // Initial check
    checkNetworkStatus();

    // Set up interval to check network status every 30 seconds
    const interval = setInterval(() => {
      checkNetworkStatus();
    }, 15000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

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

  // if not connected to network show error message
  if (!isConnected) {
    return <div className="text-white flex items-center justify-center text-xl font-bold mt-52">
      <h3>Network Error</h3>
    </div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.key}
        // variants={containerVariants}
        // initial="hidden"
        // animate="visible"
        // initial={{ x: 300, opacity: 0 }}
        // animate={{ x: 0, opacity: 1 }}
        // exit={{ x: -300, opacity: 0, transition: {ease:"easeInOut"} }}
        
        className="font-poppins bg-[#890000] h-screen"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default Root;
