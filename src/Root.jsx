import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="bg-[#890000] font-poppins">
            <Outlet />
        </>
    );
};

export default Root;