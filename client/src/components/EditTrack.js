import React from "react";
// import { useState, useEffect } from "react";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import classes from "./EditTrack.module.css";
// import { db } from "../firebase";
// import { updateDoc, doc } from "firebase/firestore";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function EditTrack(props) {
  return (
    <Modal
      // onClose={props.onCloseEdit}
      open={props.editIsShowen}
      center
      styles={{
        modal: {
          width: "80%",
          borderRadius: "10px",
          boxShadow: "0 1px 5px rgb(138, 137, 137)",
          transitionDuration: "0.4s",
          backgroundColor: "rgb(76, 72, 72)",
          color: "rgb(240, 201, 76)",
          border: "1px rgb(240, 201, 76)",
          // "@media (minWidth: 1000px)": {
          //   maxWidth: "1000px",
          //   width: "80%",
          //   display: "flex",
          //   justifyContent: "space-between",
          // },
          // overflow: "scroll",
        },
      }}
    >
      {" "}
      <div>EditTrack</div>
    </Modal>
  );
}
