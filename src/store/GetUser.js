import { create } from "zustand";
import { getCookie, setCookie } from "../cookies";
import { useCookies } from 'react-cookie';

const GetUserStore = create((set) => ({
    user: false,
    setUser: (chosenUser) => set({ user: chosenUser }),
    fetchUser: async () => {
        try {
            const accessToken = getCookie("accessToken")
            console.log("in fetch read books");
            console.log("token ", accessToken.access_token)
            const response = await fetch(`http://127.0.0.1:8000/user/me`, {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${accessToken.access_token}`,
                }),
            });

            if (!response.ok) {
                console.log("Fail");
                throw new Error("Failed to fetch books");
            }
            const userInfo = await response.json();
            set({ user: userInfo });
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    },
    userWithEmail: "",
    setUserWithEmail: (userEmail) => set({ userWithEmail: userEmail }),
    fetchUserWithEmail: async (email) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/user/${email}`, {
                method: "GET",
            });

            if (!response.ok) {
                console.log("Fail");
                throw new Error("Failed to fetch user");
            }
            const userInfo = await response.json();
            set({ userWithEmail: userInfo });
            return userInfo
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    },
}));

export default GetUserStore;
