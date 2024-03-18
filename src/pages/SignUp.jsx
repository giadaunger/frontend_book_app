import React, { useEffect, useState } from 'react';
import GoBackBtn from '../components/GoBackBtn';
import Logo from '../assets/StoryDataLogo.png';
import createUserStore from '../store/CreateUserStore';
import useStore from "../store/UserStore";
import { generateSlug } from "random-word-slugs";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const { email, setEmail, password, setPassword, user_name, setUsername, book_goal, setBookGal, createUser } = createUserStore();
    const { fetchToken } = useStore();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function usernameGenerator() {
        const generatedUsername = generateSlug()
        setUsername(generatedUsername)
    }

    useEffect(() => {
        usernameGenerator();
    }, []);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword.length < 5) {
            setPasswordError("Password too short, minimum of 5 characters");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            usernameGenerator();
            const newUser = await createUser({ email, password, user_name, book_goal });
            if (newUser) {
                const res = await fetchToken(email, password);
                if (res != null) {
                    navigate("/");
                } else {
                    console.log("Authorization failed. Invalid credentials.");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Account already exists with that username");
            setPassword("");
            console.log("Error: Account already exists with that email, try again!");
        }
    };

    console.log("Rendering SignUp component with error:", error);

    return (
        <div className="w-3/4 sm:w-2/4 mx-auto">
            <div className="mb-6">
                <GoBackBtn />
            </div>
            <div className="container bg-[#f8f2e9] flex mx-auto rounded-md p-6 shadow-md">
                <form onSubmit={handleSubmit} className="mx-auto">
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-36 h-36 mx-auto"
                    />
                    <div className="flex mx-auto flex-col">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            {passwordError && <p className="text-red-500 w-full">{passwordError}</p>}
                            {error && <p className="text-red-500 w-full">{error}</p>}
                        </div>
                        <button type="submit" className="border border-black rounded-md w-1/2 mx-auto bg-white">
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
