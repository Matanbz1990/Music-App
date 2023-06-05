import React from "react";

import classes from "./Home.module.css";
import MusicContainer from "./MusicContainer";
import HomeText from "./HomeText";
export default function Home() {
  return (
    <div className={classes.home}>
      <div className={classes.Container2}>
        <div></div>
      </div>
      <div className={classes.Container1}>
        <div>
          <HomeText className={classes.element1} />
        </div>
        <div className={classes.element2}>
          <MusicContainer />
        </div>
      </div>
    </div>
  );
}
