import React from "react";
import classes from "./Track.module.css";
import Emoji from "./Emoji";
import AudioPlayer from "./AudioPlayer";
import { Link } from "react-router-dom";
import loading from "../assets/images/loading.png";

export default function Track(props) {
  const trackClasses = `${classes.trackDetailes} ${
    props.isPlaying ? classes.isPlayingClass : ""
  }`;
  const track = props.currentTrack;
  const imgBackground = {
    backgroundImage: `url(${track.imgUrl})`,
    backgroundSize: "auto",
    width: "90%",
    margin: "auto",
    marginTop: "10px",
    // border: "solid black 1px",
  };

  return (
    <div style={imgBackground}>
      <div className={trackClasses}>
        <div className={classes.trackClasses1}>
          {track.imgUrl && (
            <Link to={`/modal/${track._id}`} className={classes.link}>
              <img
                alt="non"
                data-src={track.imgUrl}
                src={loading}
                className="lazyload"
                width="95px"
                height="95px"
              />
            </Link>
          )}
          <AudioPlayer
            url={track.trackUrl}
            imgUrl={track.imgUrl}
            title={track.title}
            artist={track.artist}
            isPlaying={props.isPlaying}
            id={track._id}
            onPlay={props.onPlay}
          />

          <div className={classes.songAndArtist}>
            <Link to={`/modal/${track._id}`} className={classes.link}>
              <h3 className={classes.title}>{track.title} </h3>
            </Link>

            <p className={classes.artist}>{track.artist}</p>
          </div>
          <p className={classes.duration}>{track.duration}</p>
        </div>
        <div className={classes.trackClasses2}>
          <div className={classes.geners}>
            {track.genres.map((genre) => {
              return (
                <p key={Math.random()} className={classes.item}>
                  {genre}
                </p>
              );
            })}
          </div>
          <div className={classes.moods}>
            {track.moods.map((mood) => {
              return (
                <p key={Math.random()} className={classes.item}>
                  {mood}
                </p>
              );
            })}
          </div>
          <Emoji
            title={track.title}
            id={track._id}
            className={classes.trackEmojis}
            trackIsLiked={track.isLiked}
          />
        </div>
      </div>
    </div>
  );
}
