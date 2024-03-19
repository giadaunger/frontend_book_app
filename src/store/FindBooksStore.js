import { create } from "zustand";
import { getCookie } from "../cookies";

const useStore = create((set) => ({
  foundBooks: false,
  foundEditions: false,
  fetchBooks: async (searchTerm) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${searchTerm}`, {
        method: "GET",
      });
      if (!response.ok) {
        console.log("Fail");
        throw new Error("Failed to fetch books");
      }
      const usersFoundBooks = await response.json();
      set({ foundBooks: usersFoundBooks });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
  addToReading: async (book_id) => {
    try {
        
      const accessToken = getCookie("accessToken")
      const response = await fetch(`http://127.0.0.1:8000/users/reading`, {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${accessToken.access_token}`,
          body: book_id,
        }),
      });
      if (!response.ok) {
        console.log("Fail");
        throw new Error("Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  },


  fetchPopularEditions: async (book_id) =>{
    try {
    const response = await fetch(`http://127.0.0.1:8000/editions/popular/${book_id}`, {
        method: "GET",
        headers: new Headers({
          body: book_id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch editions");
      }
      const editions = await response.json();
      set({ foundEditions: editions })
      console.log("editions",editions)
      return true
    } catch (error) {
      console.error("Error fetching editions:", error);
    }
  }
}));




export default useStore;
