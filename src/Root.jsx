import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="bg-">
            <Outlet />
        </div>
    );
};

export default Root;