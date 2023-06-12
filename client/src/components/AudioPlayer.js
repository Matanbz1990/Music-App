import React, { useContext } from "react";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { AudioContext } from "../store/AudioProvider";

import classes from "./AudioPlayer.module.css";

function AudioPlayer(props) {
  const { url, isPlaying, title, artist, imgUrl } = props;
  const audioContext = useContext(AudioContext);
  const playSound = (url) => {
    audioContext.playAudio(url);
    audioContext.setTheTrackTitle(title);
    audioContext.setTheTrackArtist(artist);
    audioContext.setTheTrackImgUrl(imgUrl);
  };
  const pauseSound = () => {
    audioContext.pauseAudio();
  };

  return (
    <div className={classes.audio}>
      {!isPlaying && (
        <PlayCircleOutlined
          // style={{ margin: "0" }}
          className={classes.play}
          onClick={() => {
            playSound(url);
          }}
        />
      )}
      {isPlaying && (
        <PauseCircleOutlined className={classes.pause} onClick={pauseSound} />
      )}
    </div>
  );
}

export default AudioPlayer;
