import { create } from "zustand";

const BookPageStore = create((set) => ({
  pageBook: false,
  fetchPageBook: async (book_id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/id/${book_id}`, {
        method: "GET",
      });
      if (!response.ok) {
        console.log("Fail");
        throw new Error("Failed to fetch books");
      }
      const book = await response.json();
      set({ pageBook: book });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
}));


export default BookPageStore;
