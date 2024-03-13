import { create } from "zustand";
import UserStore from "./UserStore"

const useStore = create((set) => ({
  readingBooks: false,
  fetchReadingBooks: async () => {
    try {
      const accessToken = UserStore.getState().accessToken
      console.log("in fetch reading books");
      console.log("token ", accessToken.access_token)
      const response = await fetch(`http://127.0.0.1:8000/users/reading`, {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${accessToken.access_token}`, // Correctly format the Authorization header
        }),
      });
      if (!response.ok) {
        console.log("Fail");
        throw new Error("Failed to fetch books");
      }
      const usersReadingBooks = await response.json();
      set({ readingBooks: usersReadingBooks });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
  setReadingBooks: (usersReadingBooks) =>
    set({ readingBooks: usersReadingBooks }),
}));


export default useStore;