import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/StoryDataLogo.png'
import useStore from "../store/UserStore";
import { useCookies } from 'react-cookie';

function Footer() {
    const [cookies] = useCookies(['accessToken']);
    const { accessToken } = useStore();

    return (
        <footer className="bg-[#f8f2e9] mt-10">
            <div className="container mx-auto min-h-10 flex p-4 items-center md:w-2/3 w-11/12">
                {cookies.accessToken ? (
                    <Link to="/dashboard">
                        <img
                            src={Logo}
                            alt="logo"
                            className="w-24 h-24" />
                    </Link>
                ) : (
                    <Link to="/">
                        <img
                            src={Logo}
                            alt="logo"
                            className="w-24 h-24" />
                    </Link>
                )}
                <div className="ml-auto sm:space-x-4 flex flex-col sm:flex-row">
                    <Link
                        to="/contact"
                        className={`transition duration-300 hover:scale-110 hover:text-[#71bfd9] ${location.pathname === '/contact' ? 'text-[#7ad56a]' : ''}`}>
                        Contact
                    </Link>
                    <Link className={`ransition duration-300 hover:scale-110 hover:text-[#71bfd9] ${location.pathname === '/about' ? 'text-[#7ad56a]' : ''}`}>About</Link>
                    <Link className={`transition duration-300 hover:scale-110 hover:text-[#71bfd9] ${location.pathname === '/blog' ? 'text-[#7ad56a]' : ''}`}>Blog</Link>
                </div>
            </div>
            <div className="container mx-auto text-xs">© 2024 Book App</div>
        </footer>
    )
}

export default Footer