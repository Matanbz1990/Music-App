import React, { useState, useRef } from "react";

const AudioContext = React.createContext();

const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [trackImgUrl, setTrackImgUrl] = useState("");
  const [currentTrackIdUrl, setCurrentTrackIdUrl] = useState(null);
  const audioRef = useRef(null);

  const playAudio = (trackIdUrl) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    audioRef.current = new Audio(trackIdUrl); // Assuming trackId is the URL of the audio file
    audioRef.current.play();
    setIsPlaying(true);
    setCurrentTrackIdUrl(trackIdUrl);
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(false);
    setCurrentTrackIdUrl(null);
  };

  const setTheTrackTitle = (title) => {
    setTrackTitle(title);
  };
  const setTheTrackArtist = (artist) => {
    setTrackArtist(artist);
  };
  const setTheTrackImgUrl = (imgUrl) => {
    setTrackImgUrl(imgUrl);
  };

  const audioContextValue = {
    isPlaying: isPlaying,
    currentTrackIdUrl,
    trackTitle,
    trackArtist,
    trackImgUrl,
    setTheTrackTitle,
    setTheTrackArtist,
    setTheTrackImgUrl,
    playAudio,
    pauseAudio,
  };

  return (
    <AudioContext.Provider value={audioContextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export { AudioContext, AudioProvider };
