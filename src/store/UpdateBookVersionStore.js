import { create } from "zustand";
import { getCookie } from "../cookies/cookies";

const UpdateBookVersionStore = create((set) => ({
  put_paused: async (book_version_id) => {
    try {
      const accessToken = getCookie("accessToken")
      const response = await fetch(`http://127.0.0.1:8000/book/pause/${book_version_id}`, {
        method: "PUT",
        headers: new Headers({
          Authorization: `Bearer ${accessToken.access_token}`})
      });
      if (!response.ok) {
        console.log("Fail");
        throw new Error("Failed to pause book");
      }
      return true
    } catch (error) {
      console.error("Error failed to pause book:", error);
    }
  },
  put_unpaused: async (book_version_id) => {
    try {
      const accessToken = getCookie("accessToken")
      const response = await fetch(`http://127.0.0.1:8000/book/unpause/${book_version_id}`, {
        method: "PUT",
        headers: new Headers({
          Authorization: `Bearer ${accessToken.access_token}`})
      });
      if (!response.ok) {
        console.log("Fail");
        throw new Error("Failed to unpause book");
      }
      return true
    } catch (error) {
      console.error("Error failed to unpause book:", error);
    }
  },
}));




export default UpdateBookVersionStore;
