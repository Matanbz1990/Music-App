import React, { useContext, useEffect, useState } from "react";
import classes from "./MusicContainer.module.css";
import MusicList from "./MusicList";
import FilterBy from "./Filtering/FilterBy";
import TracksContext from "../store/TracksContext";
import Filters from "./Filtering/Filters";

export default function MusicContainer() {
  const ctx = useContext(TracksContext);
  const allTracks = ctx.tracks;
  const filtersOptions = ctx.filteredOptions;
  // console.log(allTracks);
  const [filteredTracks, setFilteredTracks] = useState(allTracks);

  useEffect(() => {
    const filtered = allTracks.filter((track) => {
      if (filtersOptions.length === 0) {
        // If no filters selected, display all tracks
        return true;
      }

      // Check if all categories are present in track's moods, genres, or instruments
      const hasAllCategories = filtersOptions.every(
        (option) =>
          track.moods.includes(option) ||
          track.genres.includes(option) ||
          track.instruments.includes(option) ||
          track.albums.includes(option)
      );

      return hasAllCategories;
    });

    setFilteredTracks(filtered);
  }, [allTracks, filtersOptions]);

  return (
    <div className={classes.musicContainer1}>
      {/* <div className={classes.textH2}>
        <h2>Matan's Music</h2>
      </div> */}
      {/* {filtersOptions.length !== 0 && ( */}
      <Filters filtersOptions={filtersOptions} />
      {/* )} */}
      <div className={classes.musicContainer2}>
        <FilterBy />
        <MusicList tracks={filteredTracks} />
      </div>
    </div>
  );
}
