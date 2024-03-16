import logo from '../assets/goodKnight.png'
const StartPage = () => {
    return (
        <div className="h-dvh bg-[#890000]">
            <div className="flex items-center justify-center pt-60 pr-5">
                <img
                    className='w-48'
                    src={logo}
                    alt="goodKnight-logo"
                />
            </div>
            <div>
                <h2 className='text-white text-2xl font-normal'>POWER ACTIV +</h2>
            </div>
        </div>
    );
};

export default StartPage;