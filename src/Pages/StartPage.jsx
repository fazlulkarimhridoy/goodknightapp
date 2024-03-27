import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Geolocation } from "@capacitor/geolocation";

import { delay, motion} from "framer-motion";

const StartPage = () => {
    const navigate = useNavigate();

    const handleLocation = async () => {
        const position = await Geolocation?.getCurrentPosition();
        const latitude = position?.coords?.latitude.toString();
        const longitude = position?.coords?.longitude.toString();
        console.log("latitude", latitude);
        console.log("longitude", longitude);
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
        if (latitude.length > 0 && longitude.length > 0) {
            navigate("/signin")
        }
    }

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{duration: 0.75 , ease:"easeOut"}} className="h-dvh bg-[#890000] poppins-regular py-40">
            <div className="flex items-center justify-center ">
                <img src="/images/LargeLogo.svg"></img>
            </div>
            <div className="text-center mt-20">
                <h4 className="text-white text-xl font-normal mt-5">
                    Door to door sales activation
                </h4>
            </div>
            <div onClick={handleLocation} className="text-center mt-5">
                <Button title={'ENTER'}></Button>
            </div>
        </motion.div>
    );
};

export default StartPage;