import { Link } from "react-router-dom";
import Logo from "../components/Logo"
import { useState } from "react";
import Button from "../components/Button";
import { delay, motion} from "framer-motion";

const StartPage = () => {
    const [msg, setMsg] = useState(null)

    const handleButton = () => {
        setMsg("Clicked")
    }

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{duration: 0.75 , ease:"easeOut"}} className="h-dvh bg-[#890000] poppins-regular">
            <div className="flex items-center justify-center pt-52 ">
                <img src="/images/LargeLogo.svg"></img>
            </div>
            <div className="text-center mt-10">
               
                <h4 className="text-white font-normal mt-5">
                    Door to door sales activation
                </h4>
                <p>{msg}</p>
            </div>
            <div className="text-center py-10">
                <Link to='/signin'>
                    <Button func={handleButton} title={'ENTER'}></Button>
                    {/* <button onClick={handleButton} className="bg-gradient-to-r from-[#FF5454] to-[#E10000] text-white text-xl font-bold px-20 py-2 rounded-xl shadow-xl">
                        ENTER
                    </button> */}
                </Link>
            </div>
        </motion.div>
    );
};

export default StartPage;