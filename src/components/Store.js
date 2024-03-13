import {create} from "zustand"

const useStore = create((set) => ({
    loggedIn: false,
    setTrue: set((state) => ({
        loggedIn: true
    })),
    setFalse: set((state) => ({
        loggedIn:false
    }))
}))
