import React from "react";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import TracksContext from "../store/TracksContext";
import { AudioContext } from "../store/AudioProvider";
import Emoji from "./Emoji";

import classes from "./TrackModal.module.css";
import {
  ArrowLeftOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
export default function TrackModal() {
  const { trackId } = useParams();
  // const history = useHistory();
  const ctx = useContext(TracksContext);
  const audioContext = useContext(AudioContext);

  const allTracks = ctx.tracks;
  const [track, setTrack] = useState(
    allTracks.find((track) => track._id === trackId)
  );

  useEffect(() => {
    const foundTrack = allTracks.find((track) => track._id === trackId);
    setTrack(foundTrack);
  }, [allTracks, trackId]);

  const playSound = (trackUrl) => {
    audioContext.playAudio(trackUrl);
    audioContext.setTheTrackTitle(track.title);
    audioContext.setTheTrackArtist(track.artist);
    audioContext.setTheTrackImgUrl(track.imgUrl);
  };
  const pauseSound = () => {
    audioContext.pauseAudio();
  };
  const divStyle = {
    backgroundImage: `url(${track.imgUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginTop: "20px",
    height: "20em",
    width: "20rem",
    // Add any other desired background properties here
  };
  return (
    <div>
      <div className={classes.backAndTitle}>
        <Link to={"/"} className={classes.link}>
          <ArrowLeftOutlined />
          Back to tracks
        </Link>
        <div className={classes.titleAndAudio}>
          <h1 className={classes.title}>"{track.title}"</h1>

          <div>
            {!audioContext.isPlaying && (
              <PlayCircleOutlined
                // style={{ margin: "0" }}
                className={classes.play}
                onClick={() => {
                  playSound(track.trackUrl);
                }}
              />
            )}
            {audioContext.isPlaying && (
              <PauseCircleOutlined
                className={classes.pause}
                onClick={pauseSound}
              />
            )}
          </div>
        </div>
      </div>

      <div className={classes.info}>
        <div>
          <img style={divStyle} alt="img" />
          <div className={classes.trackEmojis}>
            <Emoji id={track._id} trackIsLiked={track.isLiked} />
          </div>
        </div>
        <div className={classes.ChatGPT}>
          <h3> ChatGPT impression: </h3>
          <p className={classes.ChatGPTText}>"{track.trackAbout}"</p>
        </div>
        <div>
          <div>
            <p className={classes.artist}>
              <strong>Artist</strong>: {track.artist}
            </p>
            <p className={classes.duration}>
              <strong>Duration: </strong>
              {track.duration}
            </p>
          </div>
          <div className={classes.moreInfo}>
            <div className={classes.attribute}>
              <h3>Instruments</h3>
              {track.instruments.map((instrument) => {
                return <p>{instrument}</p>;
              })}
            </div>
            <div className={classes.attribute}>
              <h3>Genres</h3>
              {track.genres.map((genre) => {
                return <p>{genre}</p>;
              })}
            </div>
            <div className={classes.attribute}>
              <h3>Moods</h3>
              {track.moods.map((mood) => {
                return <p>{mood}</p>;
              })}
            </div>
            <div className={classes.attribute}>
              <h3>Album</h3>
              {track.albums.map((album) => {
                return <p>{album}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
