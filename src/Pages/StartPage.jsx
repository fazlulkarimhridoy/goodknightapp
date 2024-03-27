import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
const StartPage = () => {
    const [msg, setMsg] = useState(null)

    const handleButton = () => {
        setMsg("Clicked")
    }

    return (
        <div className="h-dvh bg-[#890000] poppins-regular">
            <div className="flex items-center justify-center pt-52 pr-5">
                <img src="/images/LargeLogo.svg"></img>
            </div>
            <div className="text-center mt-10">
                <h2 className="text-white text-2xl font-normal poppins-regular ">POWER ACTIV +</h2>
                <h4 className="text-white font-normal mt-5">
                    Door to door sales activation
                </h4>
                <p>{msg}</p>
            </div>
            <div className="text-center py-10">
                <Link to='/signin'>
                    <Button func={handleButton} title={'ENTER'}></Button>
                </Link>
            </div>
        </div>
    );
};

export default StartPage;