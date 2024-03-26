import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import GoBackBtn from "../components/GoBackBtn";
import Logo from "../assets/StoryDataLogo.png";
import UpdateUserStore from "../store/UpdateUser";
import { getCookie } from "../cookies";

function ResetConfirmation() {
    const { password, setPassword, updatePassword } = UpdateUserStore()
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [error, setError] = useState("");
    const [verify, setVerify] = useState("");
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword.length < 5) {
            setPasswordErrMsg("Password too short, minimum of 5 characters");
        } else if (newPassword.length > 100) {
            setPasswordErrMsg("Password too long, maximum of 100 characters");
        } else {
            setPasswordErrMsg("");
        }
    };

    const handleRepeatPasswordChancge = (e) => {
        const verifyPassword = e.target.value
        setRepeatedPassword(verifyPassword)

        if (verifyPassword !== password) {
            setVerify("Password don't match")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!token) {
            setError("No reset token provided.");
            return;
        }
        if (password !== repeatedPassword) {
            setError("Passwords do not match.");
            return;
        }
        const url = `http://localhost:8000/reset-password`;
        const options = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token, new_password: password }),
        };
        try {
            const response = await fetch(url, options);
            if (response.status === 404) {
                setError("User does not exist.");
            } else if (response.status === 400) {
                setError("The link has expired.");
            } else if (!response.ok) {
                throw new Error("An error occurred during the password reset process.");
            } else {
                setSuccessMessage(
                    "Ditt lösenord har återställts. Vänligen logga in med ditt nya lösenord."
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const checkResetPassword = async (event) => {
    //     event.preventDefault();
    //     if (!token) {
    //         setError("No reset token provided")
    //     }

    //     try {
    //         const newPassword = await updatePassword(password);
    //         setPassword(newPassword)
    //         if (newPassword) {
    //             setError("You have successfully edited your profile!")
    //         } else {
    //             console.log("Something went wrong");
    //         }
    //     } catch (error) {
    //         console.error("Error updating user:", error);
    //     }
    // };

    return (
        <div className="w-3/4 sm:w-2/4 mx-auto">
            <div className="mb-6">
                <GoBackBtn />
            </div>
            <div className="container bg-[#f8f2e9] flex mx-auto rounded-md p-6 shadow-md">
                <form onSubmit={handleSubmit} className="mx-auto">
                    <div className="flex mx-auto flex-col">
                        <h2 className="text-center, text-4xl p-4">Reset Password</h2>
                        <img src={Logo} alt="logo" className="w-36 h-36 mx-auto" />
                        <label htmlFor="email">New password:</label>
                        <input
                            value={password}
                            onChange={handlePasswordChange}
                            type="password"
                            placeholder="Enter your new password"
                            className="mb-4 border border-black rounded-md p-2"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <label htmlFor="password">Repeat password:</label>
                        <input
                            value={repeatedPassword}
                            onChange={handleRepeatPasswordChancge}
                            type="password"
                            placeholder="Repeat your password"
                            className="mb-4 border border-black rounded-md p-2"
                        />
                        {verify && <p className="text-red-500">{verify}</p>}
                        <button
                            type="submit"
                            className="border border-black rounded-md p-2 mx-auto bg-white"
                        >
                            Reset pasword
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetConfirmation;
