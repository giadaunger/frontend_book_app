import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBackBtn from "../components/GoBackBtn";
import Logo from "../assets/StoryDataLogo.png";
import useStore from "../store/UserStore";
import { Cookies, useCookies } from 'react-cookie';
import { setCookie, getCookie } from "../cookies";

function Login() {
  const { setUser, user, fetchToken, setAccessToken, accessToken } = useStore();
  const [cookies] = useCookies(['accessToken']);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  async function checkSignIn({ email, password }) {
    await fetchToken(email=email, password=password)
    // setUser(data);
    // navigate("/");
  }

  return (
    <div className="w-3/4 sm:w-2/4 mx-auto">
      <div className="mb-6">
        <GoBackBtn />
      </div>
      <div className="container bg-[#f8f2e9] flex mx-auto rounded-md p-6 shadow-md">
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
          <button
            onClick={() => checkSignIn({ email, password })}
            className="border border-black rounded-md w-1/2 mx-auto bg-white"
          >
            Login
          </button>
          <p className="text-center mt-6 text-sm">
            No account?
            <a href="/signup" className="text-blue-500">
              {" "}
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
