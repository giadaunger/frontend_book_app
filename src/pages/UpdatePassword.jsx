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
    const navigate = useNavigate();

    const checkSignIn = async (event) => {
        event.preventDefault();
        try {
            const newPassword = await updatePassword(password);
            setPassword(newPassword)
            if (newPassword) {
                console.log(); ("You have successfully edited your profile!")
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="w-3/4 sm:w-2/4 mx-auto">
            <div className="mb-6">
                <GoBackBtn />
            </div>
            <div className="container bg-[#f8f2e9] flex mx-auto rounded-md p-6 shadow-md">
                <form onSubmit={checkSignIn} className="mx-auto">
                    <div className="flex mx-auto flex-col">
                        <img src={Logo} alt="logo" className="w-36 h-36 mx-auto" />
                        <label htmlFor="email">New password:</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your new password"
                            className="mb-4 border border-black rounded-md p-2"
                        />
                        <label htmlFor="password">Repeat password:</label>
                        <input
                            value={repeatedPassword}
                            onChange={(e) => setRepeatedPassword(e.target.value)}
                            type="password"
                            placeholder="Repeat your password"
                            className="mb-4 border border-black rounded-md p-2"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="border border-black rounded-md p-2 mx-auto bg-white"
                        >
                            Update pasword
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword;
