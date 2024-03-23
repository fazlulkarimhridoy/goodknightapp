import { useEffect, useState } from "react";
import { useRef } from "react";
import video from "/video/GoodNight.mp4"
import { useNavigate } from "react-router-dom";

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
    }, 3000); // 5 minutes

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []);


  const handleSkip = () => {
    navigate("/consumerform")
  }

  return (
    <div className="!bg-black ">
      <video
        className="video-player !bg-black"
        playsInline
        loop
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
    </div>
  );
};

export default VideoPlay;
