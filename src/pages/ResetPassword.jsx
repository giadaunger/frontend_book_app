import React, { useState } from "react";
import GoBackBtn from "../components/GoBackBtn";
import Logo from "../assets/StoryDataLogo.png";
import GetUserStore from "../store/GetUser";

function ResetPassword() {
    const { fetchUserWithEmail } = GetUserStore()
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const resetPassword = async (event) => {
        event.preventDefault();
        const userEmail = fetchUserWithEmail(email)
        if (userEmail) {
            console.log(userEmail);
        } else (error) => {
            console.log("Error " + error);
        }
    };

    const handleEmailChange = async (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(newEmail)) {
            setError("Invalid email format");
        } else {
            const checkIfEmailExists = await fetchUserWithEmail(newEmail);
            if (!checkIfEmailExists) {
                setError("No user found");
            } else {
                setError("");
            }
        }
    };

    return (
        <div className="w-3/4 sm:w-2/4 mx-auto">
            <div className="mb-6">
                <GoBackBtn />
            </div>
            <div className="container bg-[#f8f2e9] flex mx-auto rounded-md p-6 shadow-md">
                <form onSubmit={resetPassword} className="mx-auto">
                    <div className="flex mx-auto flex-col">
                        <img src={Logo} alt="logo" className="w-36 h-36 mx-auto" />
                        <label htmlFor="email">Email:</label>
                        <input
                            value={email}
                            onChange={handleEmailChange}
                            type="email"
                            placeholder="Enter your email"
                            className="mb-4 border border-black rounded-md p-2"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="border border-black rounded-md p-2 mx-auto bg-white"
                        >
                            Request password reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
