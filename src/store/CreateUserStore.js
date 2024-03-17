import { create } from "zustand";
import { getCookie } from "../cookies";

const CreateUserStore = create((set) => ({
    email: "",
    setEmail: (newEmail) => set({ email: newEmail }),
    password: "",
    setPassword: (newPassword) => set({ password: newPassword }),
    username: "",
    setUsername: (newUsername) => set({ username: newUsername}),
    bookGoal: 1,
    setBookGoal: (newBookGoal) => set({ bookGoal: newBookGoal}),
    createUser: async (userData) => {
        try {
            console.log("Request Payload:", userData);

            const response = await fetch("http://127.0.0.1:8000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                },
                body: JSON.stringify(userData),
            });

            console.log("Response:", response);

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            const data = await response.json();
            set({ email: data.email });
            set({ password: data.password});
            set({ username: data.username });
            set({ bookGoal: data.bookGoal });
            return data; 
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },
}));

export default CreateUserStore;
