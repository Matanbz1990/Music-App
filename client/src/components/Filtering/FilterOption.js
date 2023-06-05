import React, { useState } from "react";
import classes from "./FilterOption.module.css";
import Options from "./Options";
export default function FilterOption(props) {
  const [moodsIsHovered, setMoodsIsHovered] = useState(false);
  const [genresIsHovered, setGenresIsHovered] = useState(false);
  const [instrumentsIsHovered, setInstrumentsIsHovered] = useState(false);
  const [albumsIsHovered, setAlbumsIsHovered] = useState(false);

  const genres = ["Rock", "Pop", "World Music", "Jazz", "Classical", "Ambiant"];
  const instruments = [
    "Piano",
    "Guitar",
    "Saxophone",
    "Drums",
    "Bass",
    "Clarinet",
  ];
  const moods = [
    "Happy",
    "Sad",
    "Nostalgic",
    "Cinematic",
    "Emotional",
    "Energetic",
  ];
  const albums = ["Pianissimo", "Inspirations"];

  const changeFilterState = () => {
    if (props.option === "Mood") {
      setMoodsIsHovered(!moodsIsHovered);
    }
    if (props.option === "Genre") {
      setGenresIsHovered(!genresIsHovered);
    }
    if (props.option === "Instrument") {
      setInstrumentsIsHovered(!instrumentsIsHovered);
    }
    if (props.option === "Album") {
      setAlbumsIsHovered(!albumsIsHovered);
    }
  };
  return (
    <div onMouseEnter={changeFilterState} onMouseLeave={changeFilterState}>
      <div onClick={changeFilterState} className={classes.optionButton}>
        <h2>{props.option}</h2>
      </div>
      <div
        className={`${classes.sidebar} ${
          moodsIsHovered ||
          genresIsHovered ||
          instrumentsIsHovered ||
          albumsIsHovered
            ? classes.openSidebar
            : ""
        }`}
      >
        {moodsIsHovered && <Options options={moods} />}
        {genresIsHovered && <Options options={genres} />}
        {instrumentsIsHovered && <Options options={instruments} />}
        {albumsIsHovered && <Options options={albums} />}
      </div>
    </div>
  );
}
