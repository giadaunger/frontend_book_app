import { create } from "zustand";
import { getCookie, setCookie } from "../cookies";
import { useCookies } from 'react-cookie';

const UpdateUserStore = create((set) => ({
    user_name: "",
    setUsername: (newUsername) => set({ user_name: newUsername }),
    updateUsername: async (user_name) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/user/uername/${user_name}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                },
                body: JSON.stringify(user_name),
            });

            if (!response.ok) {
                throw new Error("Failed uppdate username");
            }

            const data = await response.json();
            set({ user_name: data.user_name })
            return data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },
    book_goal: "",
    setBookGal: (newBookGoal) => set({ book_goal: newBookGoal }),
    updateBookGoal: async (book, pages) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/users/reading/pages/${book}/${pages}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                },
                body: JSON.stringify(book, pages),
            });

            if (!response.ok) {
                throw new Error("Failed uppdate username");
            }

            const data = await response.json();
            set({ book_goal: data.pages })
            return data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },
    email: "",
    setEmail: (newEmail) => set({ email: newEmail }),
    updateEmail: async (email) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/user/email/${email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                },
                body: JSON.stringify(email),
            });

            if (!response.ok) {
                throw new Error("Failed uppdate username");
            }

            const data = await response.json();
            set({ email: data.email })
            return data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },
    password: "",
    setPassword: (newPassword) => set({ password: newPassword }),
    updatePassword: async (password) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/user/password/${password}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                },
                body: JSON.stringify(password),
            });

            if (!response.ok) {
                throw new Error("Failed uppdate username");
            }

            const data = await response.json();
            set({ password: data.password })
            return data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }
}));

export default UpdateUserStore;
