import { create } from "zustand";
import { getCookie, setCookie } from "../cookies";
import { useCookies } from 'react-cookie';

const UserStore = create((set) => ({
  user: false,
  setUser: (chosenUser) => set({ user: chosenUser }),
  accessToken: false,
  fetchToken: async (email, password) => {
    try {
      let formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }
      const data = await response.json();
      set({ accessToken: data });

      setCookie("accessToken", JSON.stringify(data), 25);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  },
  setAccessToken: (newToken) => set({ accessToken: newToken }),
//   checkCookie: () => {
//     const [cookies] = useCookies(["user"]);
//     if (cookies.accessToken){
//         set({accessToken: cookies.accessToken})
//     }
//   },
}));

export default UserStore;
