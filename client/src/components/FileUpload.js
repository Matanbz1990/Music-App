import React, { useState, useEffect } from "react";
import { storage } from "../config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import classes from "./FileUpload.module.css";
import { Button } from "antd";

function FileUpload(props) {
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const [uploadMessage, setUploadMessage] = useState("");
  //   const [downloadURL, setDownloadURL] = useState("");

  useEffect(() => {
    if (file) {
      checkFileExtension(file.name);
    }
  }, [file, folder]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    setIsUploaded(true);
    setLoading(true);
    if (file) {
      const fileRef = ref(storage, folder + file.name);

      uploadBytes(fileRef, file)
        .then((snapshot) => {
          setLoading(false);

          console.log("Uploaded file!", snapshot);
          setUploadMessage("uploading file success!");
          return getDownloadURL(fileRef);
        })
        .then((url) => {
          if (folder === "images/") {
            props.setTrackData((prevTrackData) => ({
              ...prevTrackData,
              imgUrl: url,
            }));
          }
          if (folder === "Audio/") {
            props.setTrackData((prevTrackData) => ({
              ...prevTrackData,
              trackUrl: url,
            }));
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setUploadMessage("Error uploading file:", error);
        });
    }
  };

  const checkFileExtension = (filename) => {
    const imgExtensions = ["jpg", "jpeg", "png"];
    const audioExtensions = ["mp3", "wav"];
    const fileExtension = filename.split(".").pop().toLowerCase();
    if (imgExtensions.includes(fileExtension)) {
      setFolder("images/");
    }
    if (audioExtensions.includes(fileExtension)) {
      setFolder("Audio/");
    }
  };

  return (
    <div className={classes.fileContainer}>
      <div className={classes.fileUpload}>
        <h3>{props.title}</h3>
        <input
          type="file"
          onChange={handleFileChange}
          id="fileUpload"
          name="file"
          accept={props.acceptedFiles}
        />
        {file ? <p>{file.name}</p> : <p>No file chosen</p>}
        <Button onClick={handleFileUpload}>upload file</Button>
      </div>
      {props.title === "image" && <p>please upload a square size image</p>}
      {loading ? <p className={classes.loadingText}>uploding file</p> : ""}
      {!loading && isUploaded && <p> {uploadMessage} </p>}
    </div>
  );
}

export default FileUpload;
