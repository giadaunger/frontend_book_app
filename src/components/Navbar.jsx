import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function SignedIn() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="flex justify-center bg-[#f8f2e9] shadow-md mb-10">
            <div className="md:w-2/3 w-11/12 mx-auto flex justify-between items-center p-2">
                <NavLink to="/">
                    Logo
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
                    <div className={`sm:flex ${isOpen ? 'flex flex-col rounded-b-lg borde shadow-md absolute top-12 right-0 bg-[#f8f2e9] p-4 sm:flex-row sm:relative sm:top-0' : 'hidden sm:visible'} sm:items-center sm:gap-40`}>
                        <div className="flex flex-col sm:flex-row">
                            <NavLink to="/" className={`mr-5 transition duration-300 hover:scale-110 ${location.pathname === '/bookshelf' ? 'text-[#ff5277]' : ''}`}>Bookshelf</NavLink>
                            <NavLink to="/" className={`mr-5 transition duration-300 hover:scale-110 ${location.pathname === '/statistics' ? 'text-[#ff5277]' : ''}`}>Statistics</NavLink>
                            <NavLink to="/" className={`mr-5 transition duration-300 hover:scale-110 ${location.pathname === '/books' ? 'text-[#ff5277]' : ''}`}>Find Books</NavLink>
                        </div>

                    </div>
                </div>
                <NavLink to="/" className={`mr-5 transition duration-300 hover:scale-110 ${location.pathname === '/profile' ? 'text-[#ff5277]' : ''}`}>Profile</NavLink>
            </div>
        </header>
    );
}

function SignedOut() {
    return (
        <header>
            <div className="md:w-2/3 w-11/12 mx-auto flex justify-between items-center p-2">
                <NavLink to="/">Logo</NavLink>
                <div className="space-x-2">
                    <NavLink to="/">About</NavLink>
                    <NavLink to="/">Blog</NavLink>
                </div>
                <button className="border border-black p-2 rounded-md">
                    <NavLink to="/login">Log in</NavLink>
                </button>
            </div>
        </header>
    )
}

function Navbar() {
    const isLoggedIn = false
    return isLoggedIn ? <SignedIn /> : <SignedOut />
}

export default Navbar