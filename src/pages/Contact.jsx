import React, { useState } from 'react'
import GoBackBtn from '../components/GoBackBtn';
import Logo from "../assets/StoryDataLogo.png";

function Contact() {
    const [email, setEmail] = useState()
    const [question, setQuestion] = useState()

    return (
        <div className="w-3/4 sm:w-2/4 mx-auto">
            <div className="mb-6">
                <GoBackBtn />
            </div>
            <div className="container bg-[#f8f2e9] flex mx-auto rounded-md p-6 shadow-md">
                <form className="mx-auto lg:w-1/2 w-5/6">
                    <div className="flex mx-auto flex-col">
                        <img src={Logo} alt="logo" className="w-36 h-36 mx-auto" />
                        <label htmlFor="email">Email:</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                            className="mb-4 border border-black rounded-md p-2"
                        />
                        <label htmlFor="password">Question:</label>
                        <textarea 
                            rows="4" 
                            placeholder="Enter your question"
                            className="mb-4 border border-black rounded-md p-2" 
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}>
                        </textarea>
                        <button
                            type="submit"
                            className="border border-black rounded-md w-1/2 mx-auto bg-white"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact