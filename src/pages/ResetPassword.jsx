import React, { useState } from "react";
import GoBackBtn from "../components/GoBackBtn";
import Logo from "../assets/StoryDataLogo.png";
import GetUserStore from "../store/GetUser";
import ResetPasswordStore from "../store/ResetPasswordStore";

function ResetPassword() {
    const { fetchUserWithEmail } = GetUserStore()
    const { setResetPasswdEmail, fetchResetPasswdEmail } = ResetPasswordStore()
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [succsess, setSuccsess] = useState("")
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const resetPassword = async (event) => {
        event.preventDefault();
        const userEmail = fetchResetPasswdEmail(email)
        setResetPasswdEmail(userEmail)
        setSuccsess("Email has been sent");
        setShowSuccessMsg(true);
        setTimeout(() => {
            setShowSuccessMsg(false);
        }, 8000);

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

    const isSendDisabled = () => {
        return error || !email.trim();
    };

    return (
        <div className="w-3/4 sm:w-2/4 mx-auto">
            <div className="mb-6">
                <GoBackBtn />
            </div>
            <div className="bg-green-200 w-3/4 sm:w-2/4 mx-auto rounded-md shadow-md mb-5 flex justify-between items-center">
                {showSuccessMsg && (
                    <>
                        <p className="text-green-600 p-2">{succsess}</p>
                        <button
                            className="p-2 text-green-600 items-center"
                            onClick={() => setShowSuccessMsg(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 float-right">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </>
                )}
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
                            className={`border p-2 rounded shadow-md transition duration-300 hover:scale-125 ${isSendDisabled() ? 'text-gray-500 pointer-events-none' : 'border-black'}`}                            disabled={isSendDisabled()}
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
