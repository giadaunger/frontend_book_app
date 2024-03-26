import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoBackBtn from "../components/GoBackBtn";
import Logo from "../assets/StoryDataLogo.png";
import useStore from "../store/UserStore";
import { useCookies } from 'react-cookie';
import { getCookie } from "../cookies";

function Login() {
  const { fetchToken } = useStore();
  const [cookies] = useCookies(['accessToken']);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const checkSignIn = async (event) => {
    event.preventDefault();
    try {
      const res = await fetchToken(email, password);
      if (res != null) {
        navigate("/dashboard");
      } else {
        setError("Authorization failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("Error during sign-in. Please try again later.");
    }
  };

  return (
    <div className="w-3/4 sm:w-2/4 mx-auto">
      <div className="mb-6">
        <GoBackBtn />
      </div>
      <div className="container bg-[#f8f2e9] flex mx-auto rounded-md p-6 shadow-md">
        <form onSubmit={checkSignIn} className="mx-auto">
          <div className="flex mx-auto flex-col">
            <img src={Logo} alt="logo" className="w-36 h-36 mx-auto" />
            <label htmlFor="email">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="mb-4 border border-black rounded-md p-2"
            />
            <label htmlFor="password">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="mb-4 border border-black rounded-md p-2"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="border border-black rounded-md p-2 w-1/3 bg-white mx-auto transition duration-300 hover:scale-125  hover:bg-[#f2d2ba] hover:border-[#e8a372] "
            >
              Login
            </button>
            <p className="text-center mt-6 text-sm mb-5">
              No account?
              <a href="/signup" className="text-[#7ad56a] font-bold transition duration-300 hover:scale-110 hover:text-[#71bfd9]">
                {" "}
                Create one
              </a>
            </p>
            <a href="/reset-password" className="text-sm text-[#7ad56a] font-bold text-center transition duration-300 hover:scale-110 hover:text-[#71bfd9]">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
