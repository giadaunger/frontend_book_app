import { create } from "zustand";
import { getCookie } from "../cookies";

const BookGoalStore = create((set) => ({
  bookGoal: false,
  fetchBookGoal: async (book_id) => {
    try {
      const accessToken = getCookie("accessToken")
      const response = await fetch(`http://127.0.0.1:8000/book_goal`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.access_token}`,
      }
      });
      if (!response.ok) {
        console.log("Fail");
        throw new Error("Failed to fetch book goal");
      }
      const goal = await response.json();
      set({ bookGoal: goal });
    } catch (error) {
      console.error("Error fetching book goal:",  );
    }
  },
}));


export default BookGoalStore;