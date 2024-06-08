import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// Redux:
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";

// Firebase:
import { app } from "../../firebase/firebase.js";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";

function GoogleAuth() {
  console.log("G1");
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("G2");
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    console.log("G3");
    provider.setCustomParameters({ prompt: "select_account" });
    console.log("G4");
    try {
      console.log("G5");
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log("G6");
      const response = await fetch("api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });
      console.log("G7");
      const data = await response.json();
      console.log("G8");
      if (response.ok) {
        console.log("G9");
        dispatch(signInSuccess(data));
        console.log("G10");
        navigate("/");
      }
    } catch (error) {
      console.log("Error -> ", error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}

export default GoogleAuth;
