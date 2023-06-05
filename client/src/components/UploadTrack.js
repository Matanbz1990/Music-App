import React from "react";
import { useState, useContext, useEffect } from "react";
import { Modal } from "@mui/material";

import classes from "./UploadTrack.module.css";
import axios from "axios";
import TracksContext from "../store/TracksContext";
import { Button } from "antd";
import FileUpload from "./FileUpload";
export default function UploadTrack(props) {
  const tracksCtx = useContext(TracksContext);
  const [isUploadApproved, setIsUploadApproved] = useState(false);
  const [trackData, setTrackData] = useState({
    title: "",
    artist: "",
    album: [],
    duration: "",
    imgUrl: "",
    trackUrl: "",
    trackAbout: "",
    genres: [],
    moods: [],
    instruments: [],
  });
  useEffect(() => {
    let isUploadApproved = true;

    for (let key in trackData) {
      if (trackData.hasOwnProperty(key)) {
        if (!trackData[key]) {
          isUploadApproved = false;
          break;
        }
      }
    }

    setIsUploadApproved(isUploadApproved);
  }, [trackData]);

  const genres = [
    "Rock",
    "Pop",
    "World Music",
    "Jazz",
    "Classical",
    "Ambiant",
    "Fusion",
    "Israeli",
  ];
  const instruments = [
    "Piano",
    "Guitar",
    "Tenor Saxophone",
    "Soprano Saxophone",
    "Flute",
    "Drums",
    "Bass Guitar",
    "Clarinet",
  ];
  const moods = [
    "Happy",
    "Morning",
    "Night",
    "Sad",
    "Exciting",
    "Nostalgic",
    "Cinematic",
    "Emotional",
    "Energetic",
  ];

  // const uploadToFireBase = (name, value) => {
  //   let folderName;
  //   if (name === "imgkUrl") {
  //     folderName = "images";
  //   }
  //   if (name === "trackUrl") {
  //     folderName = "Audio";
  //   }
  //   const storageRef = ref(storage, folderName + "/" + value);
  //upload to firebase storage

  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log("Uploaded a blob or file!");
  //   console.log(snapshot);
  // });
  // };

  const handleInputChange = (event) => {
    let { name, value, type } = event.target;

    if (type === "checkbox") {
      setTrackData((prevState) => {
        if (prevState[name] && prevState[name].includes(value)) {
          // Remove the value from the array if it already exists
          return {
            ...prevState,
            [name]: prevState[name].filter((item) => item !== value),
          };
        } else {
          // Add the value to the array if it doesn't exist
          return {
            ...prevState,
            [name]: [...(prevState[name] || []), value],
          };
        }
      });
    } else {
      setTrackData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const url = "http://localhost:4000/api/tracks/save";

  const onUploadTrack = (event) => {
    event.preventDefault();

    //upload image to firebase

    axios
      .post(url, trackData)
      .then((res) => {
        console.log(res);
        tracksCtx.addTrack(trackData);
      })
      .catch((error) => {
        console.log(error);
      });
    props.handleShowUpload();
  };

  return (
    <Modal
      open={props.handleShowUpload}
      onClose={props.handleShowUpload}
      className={classes.UploadTrackModal}
    >
      <div className={classes.upload}>
        <h1>Upload Track</h1>
        <div className={classes.uploadFiles}>
          <FileUpload
            title="music"
            setTrackData={setTrackData}
            acceptedFiles=".mp3, .wav"
          />
          <FileUpload
            title="image"
            setTrackData={setTrackData}
            acceptedFiles=".jpg, .png"
          />
        </div>
        <form
          action="/upload"
          method="post"
          encType="multipart/form-data"
          onSubmit={onUploadTrack}
        >
          <br />
          <div className={classes.InputLabel}>
            <label htmlFor="trackName">Track title:</label>
            <input
              type="text"
              id="trackName"
              name="title"
              onChange={handleInputChange}
            />
          </div>
          <br />
          <div className={classes.InputLabel}>
            <label htmlFor="artist">Artist:</label>
            <input
              type="text"
              id="artist"
              name="artist"
              onChange={handleInputChange}
            />
          </div>
          <br />
          <div className={classes.InputLabel}>
            <label htmlFor="album">Album:</label>
            <input
              type="text"
              id="album"
              name="album"
              onChange={handleInputChange}
            />
          </div>
          <br />
          <div className={classes.InputLabel}>
            <label htmlFor="duration">Duration: (X:XX)</label>
            <input
              type="text"
              id="duration"
              name="duration"
              onChange={handleInputChange}
            />
          </div>
          <br />
          <div>
            <div className={classes.arrays}>
              <label htmlFor="genres">Genres:</label>
              {genres.map((genre) => (
                <div>
                  <label>{genre}</label>
                  <input
                    onChange={handleInputChange}
                    type="checkbox"
                    value={genre}
                    name="genres"
                  />
                </div>
              ))}
            </div>
            <br />
            <div className={classes.arrays}>
              <label htmlFor="moods">Moods:</label>

              {moods.map((mood) => (
                <div>
                  <label>{mood}</label>
                  <input
                    onChange={handleInputChange}
                    type="checkbox"
                    value={mood}
                    name="moods"
                  />
                </div>
              ))}
            </div>
            <br />
            <div className={classes.arrays}>
              <label htmlFor="instruments">Instruments:</label>

              {instruments.map((instrument) => (
                <div>
                  <label>{instrument}</label>
                  <input
                    onChange={handleInputChange}
                    type="checkbox"
                    value={instrument}
                    name="instruments"
                  />
                </div>
              ))}
            </div>
          </div>
          <br />
          <div className={classes.InputLabel}>
            <label htmlFor="about">About the track:</label>
            <textarea
              type="text"
              id="trackAbout"
              name="trackAbout"
              rows="4"
              onChange={handleInputChange}
            />
          </div>
          {!isUploadApproved && (
            <p className={classes.disabledMessage}>
              fill all the necessary fields include uploads
            </p>
          )}
          {/* disabled={!isUploadApproved} */}
          <button type="submit">save track</button>
        </form>
        <Button onClick={props.handleShowUpload}>close</Button>
      </div>
    </Modal>
  );
}
