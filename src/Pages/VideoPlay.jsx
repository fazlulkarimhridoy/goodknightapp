import { useEffect, useState } from "react";
import { useRef } from "react";
import video from "/video/GoodNight.mp4";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VideoPlay = () => {
  const videoEl = useRef(null);
  const navigate = useNavigate();
  // const [showSkipButton, setShowSkipButton] = useState(false);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();

    // Add event listener for the 'ended' event
    const videoElement = videoEl.current;
    const handleVideoEnd = () => {
      navigate("/consumerform");
    };

    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [navigate]); // Add navigate to the dependency array to avoid stale closure

  // useEffect for skip button
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSkipButton(true);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  // const handleSkip = () => {
  //   navigate("/consumerform");
  // };

  return (
    <motion.div className="bg-black ">
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeIn" }}
        exit={{ x: -400, ease: "easeInOut" }}
        className="video-player !bg-black"
        playsInline
        muted={false}
        controls={false}
        alt="video"
        src={video}
        ref={videoEl}
      />
      {/* {showSkipButton && (
        <button
          onClick={handleSkip}
          className="skip-button text-white font-semibold"
        >
          Skip {">"}
          {">"}
        </button>
      )} */}
    </motion.div>
  );
};

export default VideoPlay;