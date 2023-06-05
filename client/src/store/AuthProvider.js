import { useState, useEffect } from "react";
import React from "react";
import { auth, googleAuthProvider } from "../config/firebase.config";
import { signInWithPopup } from "firebase/auth";
import { Navigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      setLoading(false);
    });
  }, [setCurrentUser]);

  const signup = async (email, password) => {
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        console.log(cred);
      });
  };

  const signInWithGoogle = async () => {
    try {
      const userCred = await signInWithPopup(auth, googleAuthProvider);
      fetch("http://localhost:4000/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userCred.user.uid }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Process the response from the server
          if (data.message === "Admin") {
            setCurrentUser(userCred);
            <Navigate to="/" replace={true} />;
          } else {
            setCurrentUser(null);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log("error signing up with Google", error);
    }
  };

  const login = async (email, password) => {
    console.log("login");

    await auth.signInWithEmailAndPassword(email, password);
    await auth.setPersistence("local");
  };
  const logout = () => {
    console.log("logout");
    return auth.signOut();
  };
  const resetPassword = (email) => {
    console.log("reset password");
    return auth.sendPasswordResetEmail(email);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
