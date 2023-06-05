import React, { useContext } from "react";
import classes from "./MusicList.module.css";
import { AudioContext } from "../store/AudioProvider";

import Track from "./Track";
export default function MusicList(props) {
  const audioContext = useContext(AudioContext);

  const { isPlaying, currentTrackIdUrl } = audioContext;

  return (
    <div className={classes.scrollable}>
      {props.tracks.length === 0 && (
        <h3 className={classes.scrollableH3}>No track found</h3>
      )}
      {props.tracks.map((track) => {
        return (
          <Track
            key={track._id}
            currentTrack={track}
            isPlaying={isPlaying && currentTrackIdUrl === track.trackUrl} // Set isPlaying to true only for the current track
          />
        );
      })}
    </div>
  );
}
