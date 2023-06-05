import React, { useContext } from "react";
import classes from "./Options.module.css";
import TracksContext from "../../store/TracksContext";

export default function Options(props) {
  const ctx = useContext(TracksContext);

  const onAddOption = (option) => {
    ctx.addFilter(option);
  };

  return (
    <div className={classes.options}>
      {props.options.map(
        (option) =>
          !ctx.filteredOptions.includes(option) && (
            <p
              key={option}
              onClick={() => onAddOption(option)}
              className={classes.item}
            >
              {option}
            </p>
          )
      )}
    </div>
  );
}
