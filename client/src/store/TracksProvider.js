import React from "react";
import { useState, useEffect } from "react";
import TracksContext from "./TracksContext";
import axios from "axios";
export default function TracksProvider(props) {
  const [tracks, setTracks] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/tracks/getAll"
        );

        setTracks(response.data.track);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addTrack = (newTrack) => {
    setTracks((prevTracks) => [...prevTracks, newTrack]);
    console.log("track added");
  };

  const removeTrackById = (trackId) => {
    setTracks((prevTracks) => {
      // Find the index of the track with the given ID
      const trackIndex = prevTracks.findIndex((track) => track._id === trackId);

      if (trackIndex !== -1) {
        // Create a new array without the track at the specified index
        const updatedTracks = [
          ...prevTracks.slice(0, trackIndex),
          ...prevTracks.slice(trackIndex + 1),
        ];

        // Return the updated tracks array
        return updatedTracks;
      }

      // If the track is not found, return the original tracks array
      return prevTracks;
    });
  };

  const editTrackById = (trackId) => {
    setTracks((prevTracks) => {
      // Find the index of the track with the given ID
      // const trackIndex = prevTracks.findIndex((track) => track.id === trackId);

      // If the track is not found, return the original tracks array
      return prevTracks;
    });
  };

  // const trackIsLiked = (trackId) => {
  //   const likedTrack = tracks.filter((track) => track._id === trackId);
  //   console.log(likedTrack[0]);

  //   setTracks((prevTracks) => {});
  // };

  const addFilter = (newFilter) => {
    setFilteredOptions((prevFilteredOptions) => [
      ...prevFilteredOptions,
      newFilter,
    ]);
  };

  const removeFilter = (filter) => {
    setFilteredOptions((prevFilteredOptions) => {
      // Filter out the specified filter from the previous options
      const updatedOptions = prevFilteredOptions.filter(
        (filterOption) => filterOption !== filter
      );
      return updatedOptions;
    });
  };

  const tracksContext = {
    tracks: tracks,
    addTrack: addTrack,
    removeTrack: removeTrackById,
    editTrack: editTrackById,
    addFilter: addFilter,
    removeFilter: removeFilter,
    filteredOptions: filteredOptions,
    // trackIsLiked: trackIsLiked,
  };
  return (
    <TracksContext.Provider value={tracksContext}>
      {props.children}
    </TracksContext.Provider>
  );
}
