import React, { useContext } from "react";
import classes from "./Filters.module.css";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import TracksContext from "../../store/TracksContext";

export default function Filters(props) {
  const ctx = useContext(TracksContext);

  const deleteFilter = (filter) => {
    ctx.removeFilter(filter);
  };

  return (
    <div>
      <ul className={classes.filters}>
        {props.filtersOptions.length > 0 && (
          <li className={classes.filtersTitle}>Filters:</li>
        )}
        {props.filtersOptions.map((filter) => (
          <li key={filter} className={classes.filter}>
            {filter}{" "}
            <HighlightOffOutlinedIcon
              className={classes.filterIcon}
              onClick={() => {
                deleteFilter(filter);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
