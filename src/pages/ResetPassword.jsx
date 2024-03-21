import React, { useState } from "react";
import GoBackBtn from "../components/GoBackBtn";
import Logo from "../assets/StoryDataLogo.png";
import nodemailer from "nodemailer"; 

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const resetPassword = async (event) => {
        event.preventDefault(); 
        const resetLink = `${email}/reset-password?token=${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        await transporter.sendMail({
            from: 'giada.unger02@gmail.com',
            to: email,
            subject: 'Reset Your Password',
            html: `<p>You have requested to reset your password. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });
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
                            onChange={(e) => setEmail(e.target.value)}
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
