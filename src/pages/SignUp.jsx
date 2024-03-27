import React, { useEffect, useState } from "react";
import GoBackBtn from "../components/GoBackBtn";
import Logo from "../assets/StoryDataLogo.png";
import createUserStore from "../store/CreateUserStore";
import useStore from "../store/UserStore";
import GetUserStore from "../store/GetUser";
import { generateSlug } from "random-word-slugs";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { fetchUserWithEmail, fetchUserWithUsername } = GetUserStore();
  const {
    email,
    setEmail,
    password,
    setPassword,
    user_name,
    setUsername,
    createUser,
  } = createUserStore();
  const { fetchToken } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");

  useEffect(() => {
    usernameGenerator();
  }, []);

  const usernameGenerator = async () => {
    const generatedUsername = generateSlug();
    const checkIfUsernameExists = await fetchUserWithUsername(
      generatedUsername
    );
    if (!checkIfUsernameExists) {
      setUsername(generatedUsername);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 5) {
      setPasswordErrMsg("Password too short, minimum of 5 characters");
    } else if (newPassword.length > 100) {
      setPasswordErrMsg("Password too long, maximum of 100 characters");
    } else {
      setPasswordErrMsg("");
    }
  };

  const handleEmailChange = async (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(newEmail)) {
      setEmailErrMsg("Invalid email format");
    } else {
      const checkIfEmailExists = await fetchUserWithEmail(newEmail);
      if (checkIfEmailExists) {
        setEmailErrMsg("Something went wrong, please try again");
      } else {
        setEmailErrMsg("");
      }
    }
  };

  const isSubmitDisabled = () => {
    return passwordErrMsg || emailErrMsg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await usernameGenerator();
      const newUser = await createUser({ email, password, user_name });
      if (newUser) {
        const res = await fetchToken(email, password);
        if (res != null) {
          navigate("/dashboard");
        } else {
          console.log("Authorization failed. Invalid credentials.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Account creation failed. Please try again.");
    }
  };

  return (
    <div className="w-3/4 sm:w-2/4 mx-auto">
      <div className="mb-6">
        <GoBackBtn />
      </div>
      <div className="container bg-[#f8f2e9] flex mx-auto rounded-md p-6 shadow-md">
        <form onSubmit={handleSubmit} className="mx-auto">
          <img src={Logo} alt="logo" className="w-36 h-36 mx-auto" />
          <div className="flex mx-auto flex-col">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="mb-4 border border-black rounded-md p-2 w-full"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Create a password"
              className="mb-4 border border-black rounded-md p-2 w-full"
            />
            <div className="mb-5 w-full">
              {emailErrMsg && (
                <p className="text-red-500 text-center mb-5">{emailErrMsg}</p>
              )}
              {passwordErrMsg && (
                <p className="text-red-500 w-full">{passwordErrMsg}</p>
              )}
              {error && <p className="text-red-500 w-full">{error}</p>}
            </div>
            <button
              type="submit"
              className={`border rounded-md border-black p-2 shadow-md transition duration-300 hover:scale-125  hover:bg-[#f2d2ba] hover:border-[#e8a372] ${
                isSubmitDisabled()
                  ? "text-gray-500 pointer-events-none border-gray-500"
                  : "border-black"
              }`}
              disabled={isSubmitDisabled()}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
