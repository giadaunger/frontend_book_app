import { create } from "zustand";
import { getCookie, setCookie } from "../cookies";
import { useCookies } from 'react-cookie';

const ResetPasswordStore = create((set) => ({
    resetPasswdEmial: "",
    setResetPasswdEmail: (newPasswordEmail) => set({ resetPasswdEmial: newPasswordEmail }),
    fetchResetPasswdEmail: async (resetPasswdEmial) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/password-recovery/${resetPasswdEmial}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resetPasswdEmial),
            });

            if (!response.ok) {
                throw new Error("Failed uppdate username");
            }

            const data = await response.json();
            set({ resetPasswdEmial: data.resetPasswdEmial })
            return data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },
    // resetPasswd: "",
    // setResetPasswd: (newPasswd) => set({ resetPasswd: newPasswd }),
    // fetchResetPasswd: async ({token, resetPasswd}) => {
    //     try {
    //         const response = await fetch(`http://127.0.0.1:8000/password-recovery/`, {
    //             method: "POST",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({token, resetPasswd}),
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed uppdate password");
    //         }

    //         const data = await response.json();
    //         set({ resetPasswd: data.resetPasswd })
    //         return data;
    //     } catch (error) {
    //         console.error("Error creating user:", error);
    //         throw error;
    //     }
    // },
}));

export default ResetPasswordStore;