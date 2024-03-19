import { useEffect } from "react";
import { useRef } from "react";

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
            <video
                style={{ maxWidth: "100%", width: "800px", margin: "0 auto" }}
                playsInline
                loop
                muted={false}
                controls={true}
                alt="All the devices"
                src="https://stream.mux.com/6fiGM5ChLz8T66ZZiuzk1KZuIKX8zJz00/medium.mp4"
                ref={videoEl}
            />
        </div>
    );
};

export default VideoPlay;