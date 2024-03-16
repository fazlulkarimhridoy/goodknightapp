import { Link } from "react-router-dom";
import logo from "../assets/goodKnight.png";
const StartPage = () => {
  return (
    <div className="h-dvh bg-[#890000]">
      <div className="flex items-center justify-center pt-60 pr-5">
        <img className="w-48" src={logo} alt="goodKnight-logo" />
      </div>
      <div className="text-center mt-10">
        <h2 className="text-white text-2xl font-normal">POWER ACTIV +</h2>
        <h4 className="text-white font-normal mt-5">
          Door to door sales activation
        </h4>
      </div>
      <div className="text-center mt-32">
        <Link to={'/signin'}>
          <button className="bg-gradient-to-r from-[#FF5454] to-[#E10000] text-white text-xl font-bold px-20 py-2 rounded-xl shadow-xl">
            ENTERr
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
