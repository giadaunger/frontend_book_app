import React from 'react'

function Login() {
    return (
        <div className="container bg-[#f7f2e3] w-3/4 sm:w-2/4 flex mx-auto rounded-md p-6">
            <div className="flex mx-auto flex-col">
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    placeholder="Enter your username" 
                    className="mb-4 border border-black rounded-md p-2" />
                <label htmlFor="password">Password:</label>
                <input 
                    type="text" 
                    placeholder="Enter your password"
                    className="mb-4 border border-black rounded-md p-2" />
                <button className="border border-black rounded-md w-1/2 mx-auto bg-white">Login</button>
                <p className="text-center mt-6 text-sm">No account?
                    <a href="/" className="text-blue-500"> Create one</a>
                </p>
            </div>
        </div>

    )
}

export default Login