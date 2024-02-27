import React from 'react'

function SignUp() {
    return (
        <div className="container bg-[#f7f2e3] w-3/4 sm:w-2/4 flex mx-auto rounded-md p-6">
            <div className="flex mx-auto flex-col">
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
    )
}

export default SignUp