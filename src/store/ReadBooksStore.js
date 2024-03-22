import { create } from "zustand";
import { Cookies, useCookies } from "react-cookie";
import { getCookie } from "../cookies/cookies";

const useStore = create((set) => ({
  readBooks: [],
  fetchReadBooks: async () => {
    try {
      const accessToken = getCookie("accessToken")
      const response = await fetch(`http://127.0.0.1:8000/users/readbooks`, {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${accessToken.access_token}`,
        }),
      });
      if (!response.ok) {
        console.log("Fail");
        throw new Error("Failed to fetch books");
      }
      const usersReadBooks = await response.json();
      set({ readBooks: usersReadBooks });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
  setReadBooks: (usersReadBooks) =>
    set({ readBooks: usersReadBooks }),
  pagesRead: {},
  fetchPagesRead: async () => {
    try {
      const accessToken = getCookie("accessToken")
      const response = await fetch(`http://127.0.0.1:8000/pages-read`, {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${accessToken.access_token}`,
        }),
      });
      if (!response.ok) {
        console.log("Fail");
        throw new Error("Failed to fetch books");
      }
      const usersReadPages = await response.json();
      set({ pagesRead: usersReadPages });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
  setPagesRead: (pages) => set({ pagesRead: pages })
}));


export default useStore;
