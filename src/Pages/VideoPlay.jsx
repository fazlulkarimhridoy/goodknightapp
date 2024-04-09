import { useEffect, useState } from "react";
import { useRef } from "react";
import video from "/video/GoodNight.mp4"
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VideoPlay = () => {
  const videoEl = useRef(null);
  const navigate = useNavigate();
  const [showSkipButton, setShowSkipButton] = useState(false);


  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);


  useEffect(() => {
    attemptPlay();
    // Step 3
    const timer = setTimeout(() => {
      setShowSkipButton(true);
    }, 15000);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []);


  const handleSkip = () => {
    navigate("/consumerform")
  }

  return (
    <motion.div initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      exit={{ x: -400, ease: "easeInOut" }} className="!bg-black ">
      <video
        className="video-player !bg-black"
        playsInline
        muted={false}
        controls={false}
        alt="video"
        src={video}
        ref={videoEl}
      />
      {showSkipButton && (
        <button onClick={handleSkip} className="skip-button text-white font-semibold">
          Skip {'>'}{'>'}
        </button>
      )}
    </motion.div>
  );
};

export default VideoPlay;
