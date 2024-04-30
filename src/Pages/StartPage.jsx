import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Geolocation } from "@capacitor/geolocation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Spin } from 'antd';
import "../CSS/startpage.css"
import toast from "react-hot-toast";


const StartPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const getLocation = async () => {
        const position = await Geolocation?.getCurrentPosition();
        const latitude = position?.coords?.latitude.toString();
        const longitude = position?.coords?.longitude.toString();
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
        return { position, latitude, longitude };
    }

    const handleLocation = async () => {
        setLoading(true);
        try {
            const { latitude, longitude } = await getLocation();
            if (latitude.length > 0 && longitude.length > 0) {
                setLoading(false);
                navigate("/signin");
            }
        } catch {
            setLoading(false);
            toast.error("Please turn on location and try again")
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} className="h-dvh bg-[#890000] poppins-regular py-40">
            <div className="flex items-center justify-center pr-5">
                <img src="/images/LargeLogo.svg"></img>
            </div>
            <div className="mt-5">
                {
                    loading ? <Spin className="text-white font-thin" tip="Getting location..." size="small">
                        <div className="content" />
                    </Spin> : <></>
                }
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