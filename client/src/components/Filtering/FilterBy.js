import React from "react";
import classes from "./FilterBy.module.css";
import FilterOption from "./FilterOption";
export default function FilterBy() {
  const options = ["Mood", "Genre", "Instrument", "Album"];
  return (
    <div className={classes.filterContainer}>
      <p>filter music by</p>
      {options.map((option) => {
        return <FilterOption option={option} key={option} />;
      })}
    </div>
  );
}
