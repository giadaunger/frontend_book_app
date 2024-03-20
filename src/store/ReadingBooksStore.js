import { create } from "zustand";
import { Cookies, useCookies } from "react-cookie";
import { getCookie } from "../cookies/cookies";

const ReadingBooksStore = create((set) => ({
  readingBooks: false,
  fetchReadingBooks: async () => {
    try {
      const accessToken = getCookie("accessToken")
      const response = await fetch(`http://127.0.0.1:8000/users/reading`, {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${accessToken.access_token}`, // Correctly format the Authorization header
        }),
      });
      if (!response.ok) {;
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

  fetchUpdatePages: async (book_version_id, pages) => {
    try {
      const accessToken = getCookie("accessToken")
      const response = await fetch(`http://127.0.0.1:8000/users/reading/pages/${book_version_id}/${pages}`, {
        method: "PUT",
        headers: new Headers({
          Authorization: `Bearer ${accessToken.access_token}`, // Correctly format the Authorization header
        }),
      });
      if (!response.ok) {;
        throw new Error("Failed to update pages");
      }
      else{
        return true
      }
    } catch (error) {
      console.error("Error udpating pages:", error);
    }
  }
}));



export default ReadingBooksStore;
