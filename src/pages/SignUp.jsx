import React, { useEffect, useState } from 'react';
import GoBackBtn from '../components/GoBackBtn';
import Logo from '../assets/StoryDataLogo.png';
import CreateUserStore from '../store/CreateUserStore';
import { generateSlug } from "random-word-slugs";

function SignUp() {
    const { email, setEmail, password, setPassword, user_name, setUsername, book_goal, setBookGal, createUser } = CreateUserStore();

    function usernameGenerator() {
        const generatedUsername = generateSlug()
        setUsername(generatedUsername)
    }

    useEffect(() => {
        usernameGenerator();
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            usernameGenerator()
            await createUser({ email, password, user_name, book_goal });
        } catch (error) {
            console.log(error + " Error");
        }
    };    

    return (
        <div className="w-3/4 sm:w-2/4 mx-auto">
            <div className="mb-6">
                <GoBackBtn />
            </div>
            <div className="container bg-[#f8f2e9] flex mx-auto rounded-md p-6 shadow-md">
                <div className="flex mx-auto flex-col">
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-36 h-36 mx-auto"
                    />
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="mb-4 border border-black rounded-md p-2"
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            className="mb-4 border border-black rounded-md p-2"
                        />
                        <button type="submit" className="border border-black rounded-md w-1/2 mx-auto bg-white">
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
