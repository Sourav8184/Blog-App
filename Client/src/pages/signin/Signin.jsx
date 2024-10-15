// Imports:
import { React, useState } from "react";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

// Redux:
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux//user/userSlice";

// Component:
function Signin() {
  const [formData, setFormData] = useState({});
  // We are using isLoading and errorMessage in the signin component
  // but in the Slice we create initial state with error and loading
  // so we are destructring the error -> errroMessage and loading -> isLoading
  const { loading: isLoading, error: errorMessage } = useSelector(
    (state) => state.user
  );
  // For Navigating signin page to another page:
  const navigate = useNavigate();

  // for dispatch action:
  const dispatch = useDispatch();

  // Set data into the formData:
  const handleChnage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      // if error is occur then dispatch action signinFailure:
      return dispatch(signInFailure("Please fill all the fields"));
    }

    try {
      // dispatch a action signinStart:
      dispatch(signInStart());

      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        // if error is occur then dispatch action signinFailure:
        dispatch(signInFailure(data.message));
      }

      if (response.ok) {
        // if everything is OK then dispatch action signinSuccess:
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      // if error is occur then dispatch action signinFailure:
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-40">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20">
        {/* Left Side */}

        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Rent
            </span>
            Ease
          </Link>
          <p className="text-sm mt-5">
            This is a property rental system. You can sign in with your email
            and password or with Google.
          </p>
        </div>

        {/* Right Side */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="Enter your Email"
                id="email"
                onChange={handleChnage}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Enter your Password"
                id="password"
                onChange={handleChnage}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account ? </span>
            <Link to="/signup" className="text-blue-500">
              SignUp
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 bg-red-300 text-black" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signin;
