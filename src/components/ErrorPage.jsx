import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            From error page
            <Link to="/"><button>Home Page</button></Link>
        </div>
    );
};

export default ErrorPage;