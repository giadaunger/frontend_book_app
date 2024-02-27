import React from 'react'
import GoBackBtn from '../components/GoBackBtn'
import Logo from '../assets/StoryDataLogo.png'

function SignUp() {
    return (
        <div className="w-3/4 sm:w-2/4 mx-auto">
            <div className="mb-6">
                <GoBackBtn />
            </div>
            <div className="container bg-[#f7f2e3] flex mx-auto rounded-md p-6 shadow-md">
                <div className="flex mx-auto flex-col">
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-36 h-36 mx-auto" />
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        placeholder="Create a username"
                        className="mb-4 border border-black rounded-md p-2" />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        placeholder="Create a password"
                        className="mb-4 border border-black rounded-md p-2" />
                    <button className="border border-black rounded-md w-1/2 mx-auto bg-white">Signup</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp