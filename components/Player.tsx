import { useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import ReactPlayer from "react-player";

const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), {
  ssr: false,
});

const Player = () => {
  const videoRef = useRef<ReactPlayer>(null);

  const router = useRouter();
  const videoId = router.query.v;

  return (
    <VideoPlayer
      playerRef={videoRef}
      url={`https://www.youtube.com/watch?v=${videoId}`}
      controls
      light
      className="mb-8 player"
    />
  );
};

export default Player;
