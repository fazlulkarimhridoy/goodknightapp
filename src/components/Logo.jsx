
// ` w-[${width}] h-[${height}] relative` w-[183px] h-[200px]
const Logo = ({width,height}) => {
    
    return (
        <div className="flex items-center justify-center ml-8">
            <img  className="w-[215px] h-[113px]" src="/images/newLogo.svg"/>
            {/* <img className='absolute top-8' src='/images/godrejLogo.svg'></img>
            <img className='absolute top-[60px] left-[30px] rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#373737]' src='/images/GoodNightLogo.svg'></img> */}
        </div>
    );
}

export default Logo;


// className='absolute top-[25px]'
// className='absolute top-[40px] left-[30px]'
// className={`relative ${width} ${height}  `}