import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import GoBackBtn from "../components/GoBackBtn";
import Logo from "../assets/StoryDataLogo.png";
import useStore from "../store/UserStore";

function Login() {
  const { setUser, user } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function checkSignIn({ email, password }) {
    async function checkEmail(email) {
      console.log(email);
      const response = await fetch(
        `http://127.0.0.1:8000/users/email/${encodeURIComponent(email)}`);
      console.log("in check email");
      if (!response.ok) {
          console.log("fail")
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      console.log(data);
      return data;
    }

    function checkPassword({ password, data }) {
      if (data.password === password) {
        return true;
      } else {
        return false;
      }
    }
    {
      console.log("inCheckSignIn");
    }

    let success = false;
    const data = await checkEmail(email); // Use await here
    if (data) {
      success = checkPassword({ password, data }); // Pass an object to checkPassword
    }
    if (success === true) {
      setUser(data);
      navigate("/")
    }
  }

  return (
    <div className="w-3/4 sm:w-2/4 mx-auto">
      <div className="mb-6">
        <GoBackBtn />
      </div>
      {console.log (user)}
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
