import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChnage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    // Stop the default behavior of an event:
    e.preventDefault();

    // Validation:
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      // in the starting loading -> true and error -> null:
      setIsLoading(true);
      setErrorMessage(null);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // convert response to JSON:
      const data = await response.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      // if everything is ok then loading false:
      setIsLoading(false);
      if (response.ok) {
        // if everything is ok then loading false and go to signin page
        navigate("/signin");
      }
    } catch (error) {
      // if an error then sent a error Something went wrong
      setErrorMessage("Something went wrong");
      setIsLoading(false);
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
            This is a property rental system. You can sign up with your email
            and password or with Google.
          </p>
        </div>

        {/* Right Side */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Enter your Username"
                id="username"
                onChange={handleChnage}
              />
            </div>
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
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have and account ? </span>
            <Link to="/signin" className="text-blue-500">
              Signin
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

export default Signup;
