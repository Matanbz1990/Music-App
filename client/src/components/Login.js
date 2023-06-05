import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import classes from "./Login.module.css";
import { AuthContext } from "../store/AuthProvider";
import { Link } from "react-router-dom";

export default function Login() {
  const { currentUser, signInWithGoogle } = useContext(AuthContext);
  const [isSign, setIsSign] = useState(false);

  const handleSignInWithGoogle = () => {
    signInWithGoogle().then(() => {
      setIsSign(true);
    });
  };
  return (
    <div className={classes.signin}>
      <div className={classes.signinGoogle} onClick={handleSignInWithGoogle}>
        <FcGoogle size={20} />
        <h4>Sign-in with Google</h4>
      </div>
      {isSign && !currentUser && (
        <p>
          you are not authorized! go to the{" "}
          <Link to="/" className={classes.link}>
            Home page
          </Link>
        </p>
      )}
    </div>
  );
}
