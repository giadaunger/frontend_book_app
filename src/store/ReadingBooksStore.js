import { create } from "zustand";
import { Cookies, useCookies } from "react-cookie";
import { getCookie } from "../cookies/cookies";

const ReadingBooksStore = create((set) => ({
  readingBooks: false,
  booksReading: false,
  booksReadingId: false,
  pausedBooksReading: false,
  pausedBooksReadingID: false,
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
      return true
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
  setReadingBooks: (usersReadingBooks) =>
    set({ readingBooks: usersReadingBooks }),
  setBooksReading: (usersReadingBooks) =>
    {
      const tempBook = []
      const tempBookId = []
      const pausedTemp = []
      usersReadingBooks.map((book)=>{
        if( book.paused === false ){
        tempBook.push(book.book_version.book,
        tempBookId.push(book.book_version.book.id))}
        else{
          pausedTemp.push(book.book_version.book)
        }
      })
      set({ booksReading: tempBook })
      set({booksReadingId: tempBookId})
      set({pausedBooksReading: pausedTemp})
    },

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
