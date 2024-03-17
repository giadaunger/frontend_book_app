import React, { useState } from 'react';
import GoBackBtn from '../components/GoBackBtn';
import Logo from '../assets/StoryDataLogo.png';
import CreateUserStore from '../store/CreateUserStore';

function SignUp() {
    const { email, setEmail, password, setPassword, username, setUsername, bookGoal, setBookGal, createUser } = CreateUserStore();

    function usernameGenerator() {
        const generatedUsername = UsernameGenerator("-")
        setUsername(generatedUsername)
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            usernameGenerator()
            await createUser({ email, password, username, bookGoal });
        } catch (error) {
            console.log(error + " Error");
        }
    };

    console.log(username);
    

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
