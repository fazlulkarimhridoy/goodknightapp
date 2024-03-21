import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="font-poppins bg-[#890000] h-screen">
            <Outlet />
        </div>
    );
};

export default Root;