import React from 'react'
import GoBackBtn from '../components/GoBackBtn'
import Logo from '../assets/StoryDataLogo.png'

function Login() {
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
                        className="w-36 h-36 mx-auto" />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="mb-4 border border-black rounded-md p-2" />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="mb-4 border border-black rounded-md p-2" />
                    <button className="border border-black rounded-md w-1/2 mx-auto bg-white">Login</button>
                    <p className="text-center mt-6 text-sm">No account?
                        <a href="/signup" className="text-blue-500"> Create one</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login