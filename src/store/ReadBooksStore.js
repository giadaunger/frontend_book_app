import { create } from "zustand";
import { Cookies, useCookies } from "react-cookie";
import { getCookie } from "../cookies/cookies";

const ReadBooksStore = create((set) => ({
  readBooks: false,
  fetchReadBooks: async () => {
    try {
      const accessToken = getCookie("accessToken")
      console.log("in fetch read books");
      console.log("token ", accessToken.access_token)
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
}));


export default ReadBooksStore;
