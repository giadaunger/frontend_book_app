import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-[#f7f2e3]">
            <div className="container mx-auto min-h-10 flex p-4 items-center">
                <Link>Logo</Link>
                <div className="ml-auto sm:space-x-4 flex flex-col sm:flex-row">
                    <Link>Profile</Link>
                    <Link>About</Link>
                    <Link>Blog</Link>
                </div>
            </div>
            <div className="container mx-auto text-xs">© 2024 Book App</div>
        </footer>
    )
}

export default Footer