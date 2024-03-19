import { useEffect } from "react";
import { useRef } from "react";
import Navbar from "../components/Navbar";
import video from "../assets/GoodNight.mp4";

const VideoPlay = () => {
  const videoEl = useRef(null);

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

  return (
    <div className="video-container ">
      <video
        
        className="video-player"
        playsInline
        loop
        muted={true}
        controls={true}
        alt="All the devices"
        src={video}
        ref={videoEl}
      />
    </div>
  );
};

export default VideoPlay;
