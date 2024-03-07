import {create} from "zustand"

const UseStore = create((set) => ({
    loggedIn: false,
    setTrue: set((state) => ({
        loggedIn: true
    })),
    setFalse: set((state) => ({
        loggedIn:false
    }))
}))
