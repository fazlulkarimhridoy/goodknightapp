import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Root = () => {
  const location = useLocation();
//   const [prevLocation, setPrevLocation] = useState();
//   const [currentPath, setCurrentPath] = useState(location.pathname);

//   const [show,setShow] = useState(true)

//   useEffect(() => {
//     if (location !== prevLocation) {
//       // Location has changed
//       console.log('Location changed:', location);
//       setPrevLocation(location);
//       setCurrentPath(location.pathname); // Update the state with the new path
//     }
//   }, [location, prevLocation]);

//   console.log("previous location :", prevLocation);
//   console.log("current loaction :", currentPath);

  return (
    <AnimatePresence>
   
      <motion.div
        key={location.key}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -800, opacity: 0 }}
        className="font-poppins bg-[#890000] h-screen"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default Root;
