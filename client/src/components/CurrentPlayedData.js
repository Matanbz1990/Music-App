import classes from "./CurrentPlayedData.module.css";
export default function CurrentPlayedData(props) {
  return (
    <div className={classes.nowPlayingData}>
      <div className={classes.nowPlaying}>
        {/* {props.isPlaying && ( */}
        <div className={classes.nowPlayingText}>
          <h3> ChatGPT impression: </h3>
          <p className={classes.trackAbout}>"{props.trackAbout}"</p>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
