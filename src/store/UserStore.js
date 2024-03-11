import { create } from "zustand";
import { setCookie } from "../cookies";

const useStore = create((set) => ({
    user: false,
    setUser: (chosenUser) => set({ user: chosenUser }),
    accessToken: false,
    fetchToken: async (email, password) => {
        try {
            let formData = new FormData();
            formData.append("username", email)
            formData.append("password", password)
            const response = await fetch("http://127.0.0.1:8000/token", {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                throw new Error('Failed to fetch token');
            }
            const data = await response.json();
            set({ accessToken: data });
            setCookie("accessToken",JSON.stringify(data))
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    },
    setAccessToken: (newToken) => set({ accessToken: newToken }),
}));

export default useStore;
