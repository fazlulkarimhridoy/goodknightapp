import { GiHamburgerMenu } from "react-icons/gi";
import profile from "../assets/profile.png"
import logo from "../assets/goodKnight.png"

const HomePage = () => {
    return (
        <div className="h-dvh">
            {/* hamburger menu */}
            <div className="flex justify-end px-4 py-2">
                <GiHamburgerMenu size={25} color="#890000" />
            </div>

            {/* profile information */}
            <div className="flex items-center justify-between mt-3 px-4">
                <div className="flex items-start gap-1">
                    <img
                        className="w-28 rounded-full"
                        src={profile}
                        alt="profile_picture"
                    />
                    <div>
                        <h3 className="font-bold text-lg">Welcome !</h3>
                        <h4 className="text-sm font-medium mt-2">Mr. Rakib Hasan</h4>
                        <h4 className="text-sm font-medium mt-1">BP ID: 500763</h4>
                    </div>
                </div>
                <div>
                    <img
                        className="w-24"
                        src={logo}
                        alt="logo"
                    />
                </div>
            </div>
            <hr className="border border-solid border-[#FF283D] shadow-black shadow-2xl my-5"></hr>

            {/* summery section */}
            <div>
                <img src="" alt="" />
                <div>
                    
                </div>
            </div>
        </div>
    );
};

export default HomePage;