import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/StoryDataLogo.png'

function Footer() {
    return (
        <footer className="bg-[#f8f2e9] mt-10">
            <div className="container mx-auto min-h-10 flex p-4 items-center md:w-2/3 w-11/12">
                <Link>
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-24 h-24" />
                </Link>
                <div className="ml-auto sm:space-x-4 flex flex-col sm:flex-row">
                    <Link to="/contact">Contact</Link>
                    <Link>About</Link>
                    <Link>Blog</Link>
                </div>
            </div>
            <div className="container mx-auto text-xs">© 2024 Book App</div>
        </footer>
    )
}

export default Footer