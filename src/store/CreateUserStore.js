import { create } from "zustand";
import { getCookie } from "../cookies";

const createUserStore = create((set) => ({
    email: "",
    setEmail: (newEmail) => set({ email: newEmail }),
    password: "",
    setPassword: (newPassword) => set({ password: newPassword }),
    user_name: "",
    setUsername: (newUsername) => set({ user_name: newUsername}),
    createUser: async (userData) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            } 

            const data = await response.json();
            set({ email: data.email });
            set({ password: data.password});
            set({ user_name: data.user_name });
            return response;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }

    },
}));

export default createUserStore;
