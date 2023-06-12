import React, { useState, useEffect, useContext } from "react";
import classes from "./FilterOption.module.css";
import Options from "./Options";

export default function FilterOption(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  // useEffect(()=>{},[])

  useEffect(() => {
    let timeout;
    if (isHovered) {
      timeout = setTimeout(() => {
        setShowComponent(true);
      }, 350);
    } else {
      setShowComponent(false);
    }

    return () => clearTimeout(timeout);
  }, [isHovered]);
  const genres = ["Rock", "Pop", "World Music", "Jazz", "Classical", "Ambient"];
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

  const openFilterState = () => {
    setIsHovered(true);
  };
  const closeFilterState = () => {
    setIsHovered(false);
  };
  const changeFilterState = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div
      onClick={changeFilterState}
      onMouseEnter={openFilterState}
      onMouseLeave={closeFilterState}
    >
      <div className={classes.optionButton}>
        <h2>{props.option}</h2>
      </div>
      {isHovered && (
        <div
          className={`${classes.sidebar} ${
            showComponent ? classes.openSidebar : ""
          }`}
        >
          {showComponent && (
            <>
              {props.option === "Mood" && (
                <Options options={moods} setShowComponent={setShowComponent} />
              )}
              {props.option === "Genre" && <Options options={genres} />}
              {props.option === "Instrument" && (
                <Options options={instruments} />
              )}
              {props.option === "Album" && <Options options={albums} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}
