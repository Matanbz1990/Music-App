import classes from "./CurrentPlayedData.module.css";
export default function CurrentPlayedData(props) {
  return (
    <div>
      <div className={classes.nowPlaying}>
        {props.isPlaying && (
          <div className={classes.nowPlayingText}>
            <h3> ChatGPT impression: </h3>
            <p>"{props.trackAbout}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
