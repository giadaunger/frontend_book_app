import React from 'react';
import SignedInNav from './SignedInNav';
import SignedOutNav from './SignedOutNav';
import useStore from "../store/UserStore";

function Navbar() {
    const {user} = useStore()
    let render = false
    console.log(user)
    if (user){
        render = true
    }
    return render ? <SignedInNav /> : <SignedOutNav />
}

export default Navbar