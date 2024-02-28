import React from 'react';
import SignedInNav from './SignedInNav';
import SignedOutNav from './SignedOutNav';


function Navbar() {
    const isLoggedIn = true
    return isLoggedIn ? <SignedInNav /> : <SignedOutNav />
}

export default Navbar