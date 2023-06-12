import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  StarOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../store/AuthProvider";
import TracksContext from "../store/TracksContext";
import EditTrack from "./EditTrack";
import classes from "./Emoji.module.css";

export default function Emoji(props) {
  const [editIsShown, setEditIsShown] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const tracksCtx = useContext(TracksContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(props.trackIsLiked);
  }, [props.trackIsLiked]);

  const likedClasses = `${classes.emoji} ${isLiked ? classes.isLiked : ""}`;

  const deleteTrack = () => {
    const url = "http://localhost:4000/api/tracks/delete/" + props.id;

    axios
      .delete(url)
      .then((res) => {
        console.log("track deleted from db", res);
      })
      .catch((error) => {
        console.log(error);
      });

    tracksCtx.removeTrack(props.id);
  };

  const editTrack = () => {
    setEditIsShown(true);
  };

  const onLikedChange = () => {
    const updatedData = {
      isLiked: !isLiked,
    };

    axios
      .put(
        `http://localhost:4000/api/tracks/updateIsLiked/${props.id}`,
        updatedData
      )
      .then((response) => {
        // Handle success
        console.log(response.data);
        setIsLiked(!isLiked); // Toggle the isLiked state
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const onShareClicked = async () => {
    try {
      await navigator.share({
        title: props.title,
        url: window.location.href,
      });
      console.log("Page shared successfully");
    } catch (error) {
      console.error("Error sharing page:", error);
    }
  };
  return (
    <div className={classes.emojis}>
      <StarOutlined className={likedClasses} onClick={onLikedChange} />
      <ShareAltOutlined className={classes.emoji} onClick={onShareClicked} />
      {currentUser && (
        <div className={classes.emojis}>
          <DeleteOutlined className={classes.emoji} onClick={deleteTrack} />
          <EditOutlined className={classes.emoji} onClick={editTrack} />
        </div>
      )}
      {editIsShown && <EditTrack />}
    </div>
  );
}
