import { useEffect } from "react";
import { useRef } from "react";
import video from "/video/GoodNight.mp4"

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
    <div className="h-dvh">
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
