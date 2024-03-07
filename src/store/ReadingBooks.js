import { create } from "zustand";

const useStore = create((set) => ({
    readingBooks: false,
    fetchReadingBooks: async (userId) => {
        try {
            console.log("in fetch reading books")
            const response = await fetch(`http://127.0.0.1:8000/users/${userId}/reading`)
            if(!response.ok) {
                console.log("Fail")
                throw new Error('Failed to fetch books');
            }
            console.log()
            const usersReadingBooks = await response.json();
            set ({ readingBooks: usersReadingBooks });
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    },
    setReadingBooks: (usersReadingBooks) => set({ readingBooks: usersReadingBooks }),
}));

export default useStore;
