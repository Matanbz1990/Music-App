import React from "react";

const TracksContext = React.createContext({
  tracks: [],
  addTrack: (track) => {},
  removeTrack: (id) => {},
  editTrack: (id) => {},
  filteredOptions: [],
  addFilter: (filter) => {},
  removeFilter: (filter) => {},
});

export default TracksContext;
