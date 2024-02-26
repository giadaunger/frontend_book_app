import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="bg-[#f7f2e3]">
      <div className="container mx-auto min-h-10 flex items-center p-4 justify-between">
            <NavLink to="/">Logga</NavLink>
        <div className="flex gap-8">
             <NavLink to="/statistics">Statistics</NavLink>
             <NavLink to="/bookshelf">Bookshelf</NavLink>
             <NavLink to="/books">Find Books</NavLink>
        </div>
             <NavLink to="/profile">Profile</NavLink>
      </div>
    </header>
  )
}

export default Navbar