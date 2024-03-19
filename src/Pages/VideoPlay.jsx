import { useEffect } from "react";
import { useRef } from "react";
import video from "../assets/GoodNight.mp4"

const VideoPlay = () => {
    const videoEl = useRef(null);

    const attemptPlay = () => {
        videoEl &&
            videoEl.current &&
            videoEl.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
    };

    useEffect(() => {
        attemptPlay();
    }, []);

    return (
        <div>
            {/* <video
                style={{ transformOrigin: "top-left", transform: "rotate(90deg)", width: "100%", height: "100%" }}
                playsInline
                muted={true}
                src={video}
                ref={videoEl}
            /> */}
            <div >

            </div>
        </div>
    );
};

export default VideoPlay;