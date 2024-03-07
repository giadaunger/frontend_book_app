import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../assets/StoryDataLogo.png'
import useStore from "../store/UserStore";
import { deleteCookie } from "../cookies/deleteCookie";


function SignedInNav() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { setUser } = useStore();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="flex justify-center bg-[#f8f2e9] shadow-md mb-10">
            <div className="md:w-2/3 w-11/12 mx-auto flex justify-between items-center">
                <NavLink to="/">
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-24 h-24" />
                </NavLink>
                <div className="ml-auto sm:ml-0 flex items-center text-black">
                    <div className="sm:hidden">
                        <button onClick={toggleMenu} className="focus:outline-none mr-5 mt-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                    <div className={`sm:flex ${isOpen ? 'flex flex-col rounded-b-lg shadow-md sm:shadow-none absolute top-24 right-0 bg-[#f8f2e9] p-5 sm:flex-row sm:relative sm:top-0' : 'hidden sm:visible'} sm:items-center sm:gap-40`}>
                        <div className="flex flex-col sm:flex-row">
                            <NavLink to="/" className={`mr-5 transition duration-300 hover:scale-110 ${location.pathname === '/bookshelf' ? 'text-[#ff5277]' : ''}`}>Bookshelf</NavLink>
                            <NavLink to="/statistics" className={`mr-5 transition duration-300 hover:scale-110 ${location.pathname === '/statistics' ? 'text-[#ff5277]' : ''}`}>Statistics</NavLink>
                            <NavLink to="/" className={`mr-5 transition duration-300 hover:scale-110 ${location.pathname === '/books' ? 'text-[#ff5277]' : ''}`}>Find Books</NavLink>
                        </div>

                    </div>
                </div>
                <NavLink to="/" className={`mr-5 transition duration-300 hover:scale-110 ${location.pathname === '/profile' ? 'text-[#ff5277]' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </NavLink>
                <button onClick={() => deleteCookie(["user"])}>
                  logout
                </button>
            </div>
        </header>
    );
}

export default SignedInNav