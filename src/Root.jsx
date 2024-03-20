import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="bg-[#890000]">
            <Outlet />
        </div>
    );
};

export default Root;