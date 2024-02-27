import React from 'react'
import { useNavigate } from 'react-router-dom'

function GoBackBtn() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="flex bg-[#f7f2e3] py-2 px-4 rounded font-semibold mt-2 shadow-md transition duration-300 hover:scale-125" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            Go back
        </button>
    )
}

export default GoBackBtn