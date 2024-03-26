import { create } from "zustand";
import { getCookie, setCookie } from "../cookies";
import { useCookies } from 'react-cookie';

const UpdateUserStore = create((set) => ({
    user_name: "",
    setUsername: (newUsername) => set({ user_name: newUsername }),
    book_goal: "",
    setBookGoal: (newBookGoal) => set({ book_goal: newBookGoal }),
    updateBookGoal: async (book_goal) => {
        try {
            const accessToken = getCookie("accessToken")
            const response = await fetch(`http://127.0.0.1:8000/user/new-book-goal/${book_goal}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken.access_token}`,
                },
                body: JSON.stringify(book_goal),
            });

            if (!response.ok) {
                throw new Error("Failed uppdate book goal");
            }

            const data = await response.json();
            set({ book_goal: data.book_goal })
            return data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }, 
    email: "",
    setEmail: (newEmail) => set({ email: newEmail }),
    updateUser: async ({ user_name, book_goal, email }) => {
        try {
            const accessToken = getCookie("accessToken")
            const response = await fetch(`http://127.0.0.1:8000/user/${user_name}/${book_goal}/${email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken.access_token}`,
                },
                body: JSON.stringify({ user_name, book_goal, email }),
            });

            if (!response.ok) {
                throw new Error("Failed uppdate username");
            }

            const data = await response.json();
            set({ user_name: data.user_name })
            set({ book_goal: data.book_goal })
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
            const accessToken = getCookie("accessToken")
            const response = await fetch(`http://127.0.0.1:8000/user/password/${password}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken.access_token}`,
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