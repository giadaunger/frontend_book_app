import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBackBtn from "../components/GoBackBtn";
import Logo from "../assets/StoryDataLogo.png";
import UpdateUserStore from "../store/UpdateUser";
import { getCookie } from "../cookies";

function UpdatePassword() {
    const { password, setPassword, updatePassword } = UpdateUserStore()
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [error, setError] = useState("");
    const [verify, setVerify] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword.length < 5) {
            setError("Password too short, minimum of 5 characters");
        } else if (newPassword.length > 100) {
            setError("Password too long, maximum of 100 characters");
        } else {
            setError("");
        }
    };

    const handleRepeatPasswordChancge = (e) => {
        const verifyPassword = e.target.value
        setRepeatedPassword(verifyPassword)

        if (verifyPassword !== password) {
            setVerify("Password don't match")
        } else {
            setVerify("")
        }
    }

    const checkPassword = async (event) => {
        event.preventDefault();
        try {
            const newPassword = await updatePassword(password);
            setPassword(newPassword)
            if (newPassword) {
                setError("You have successfully edited your profile!")
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const isSubmitDisabled = () => {
        return error || verify;
    };

    return (
        <div className="w-3/4 sm:w-2/4 mx-auto">
            <div className="mb-6">
                <GoBackBtn />
            </div>
            <div className="container bg-[#f8f2e9] flex mx-auto rounded-md p-6 shadow-md">
                <form onSubmit={checkPassword} className="mx-auto">
                    <div className="flex mx-auto flex-col">
                        <h2 className="text-center, text-4xl p-4">Update Password</h2>
                        <img src={Logo} alt="logo" className="w-36 h-36 mx-auto" />
                        <label htmlFor="email">New password:</label>
                        <input
                            value={password}
                            onChange={handlePasswordChange}
                            type="password"
                            placeholder="Enter your new password"
                            className="mb-4 border border-black rounded-md p-2"
                        />
                        <label htmlFor="password">Repeat password:</label>
                        <input
                            value={repeatedPassword}
                            onChange={handleRepeatPasswordChancge}
                            type="password"
                            placeholder="Repeat your password"
                            className="mb-4 border border-black rounded-md p-2"
                        />
                        <div className="text-red-500 text-center mb-10">
                            {verify && <p>{verify}</p>}
                            {error && <p>{error}</p>}
                        </div>
                        <button
                            type="submit"
                            className={`border rounded-md border-black p-2 shadow-md transition duration-300 hover:scale-125  hover:bg-[#f2d2ba] hover:border-[#e8a372] ${isSubmitDisabled()
                                ? "text-gray-500 pointer-events-none border-gray-500"
                                : "border-black"
                                }`}
                            disabled={isSubmitDisabled()}                        >
                            Update pasword
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword;
