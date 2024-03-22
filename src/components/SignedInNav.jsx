import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../assets/StoryDataLogo.png'
import useStore from "../store/UserStore";
import { deleteCookie } from "../cookies";


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
                <NavLink to="/dashboard">
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-24 h-24" />
                </NavLink>
                <div className="ml-auto lg:ml-0 flex items-center text-black">
                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="focus:outline-none mr-5 mt-2 transition duration-300 hover:scale-110 hover:text-[#71bfd9]">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                    <div className={`lg:flex ${isOpen ? 'flex flex-col rounded-b-lg shadow-md lg:shadow-none absolute top-24 md:w-[30%] lg:w-full right-0 bg-[#f8f2e9] p-5 lg:flex-row lg:relative lg:top-0' : 'hidden lg:visible'} lg:items-center lg:gap-40`}>
                        <div className="flex flex-col lg:flex-row lg:w-full">
                            <NavLink to="/" className={`mr-5 transition duration-300 hover:scale-110 hover:text-[#71bfd9] ${location.pathname === '/' ? 'text-[#7ad56a]' : ''}`}>Bookshelf</NavLink>
                            <NavLink to="/statistics" className={`mr-5 transition duration-300 hover:scale-110 hover:text-[#71bfd9] ${location.pathname === '/statistics' ? 'text-[#7ad56a]' : ''}`}>Statistics</NavLink>
                            <NavLink to="/findbooks" className={`mr-5 transition duration-300 hover:scale-110 hover:text-[#71bfd9] ${location.pathname === '/findbooks' ? 'text-[#7ad56a]' : ''}`}>Find Books</NavLink>
                            <NavLink to="/mybooks" className={`mr-5 mb-5 lg:mb-0 transition duration-300 hover:scale-110 hover:text-[#71bfd9] ${location.pathname === '/mybooks' ? 'text-[#7ad56a]' : ''}`}>My Books</NavLink>
                            <button
                                onClick={() => deleteCookie(["accessToken"])}
                                className="transition duration-300 hover:scale-110 border border-black rounded-md p-1 hover:bg-[#bde1ed] hover:border-[#71bfd9]" >
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
                <div className="flex">
                    <NavLink to="/profile" className={`mr-5 transition duration-300 hover:scale-110 hover:text-[#71bfd9] ${location.pathname === '/profile' ? 'text-[#7ad56a]' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default SignedInNav