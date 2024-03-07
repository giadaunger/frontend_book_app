import { create } from "zustand"

const useStore = create((set) => ({
    user: [],
    userId: "",
    fetchUser: async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/users/${userId}`)
            if(!response.ok) {
                throw new Error('Failed to fetch user');
            }
            const chosenUser = response.json();
            set ({ user: chosenUser });
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    },
    setUserId: (chosenUserId) => set({ userId: chosenUserId }),
}));

export default useStore;
