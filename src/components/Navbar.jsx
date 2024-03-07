import React from 'react';
import SignedInNav from './SignedInNav';
import SignedOutNav from './SignedOutNav';
import { useCookies } from 'react-cookie';

function Navbar() {
    const [cookies] = useCookies(['user']);
    console.log(cookies.user)

    return cookies.user ? <SignedInNav /> : <SignedOutNav />
}

export default Navbar