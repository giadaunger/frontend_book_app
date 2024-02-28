import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/StoryDataLogo.png'

function SignedOutNav() {
    return (
        <header className="flex justify-center bg-[#f8f2e9] shadow-md mb-10">
            <div className="md:w-2/3 w-11/12 mx-auto flex justify-between items-center p-2">
                <NavLink to="/">
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-24 h-24" />
                </NavLink>
                <div className="space-x-2">
                    <NavLink to="/">About</NavLink>
                    <NavLink to="/">Blog</NavLink>
                </div>
                <button className="border border-black rounded-md flex p-2">
                    <NavLink to="/login">
                        Log in
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </NavLink>
                </button>
            </div>
        </header>
    )
}

export default SignedOutNav