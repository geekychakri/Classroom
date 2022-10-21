import { LegacyRef } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player/lazy";

export default function ReactPlayerWrapper(
  props: ReactPlayerProps & {
    playerRef: LegacyRef<ReactPlayer>;
  }
) {
  const { playerRef, ...rest } = props;
  return <ReactPlayer ref={playerRef} {...rest} />;
}
