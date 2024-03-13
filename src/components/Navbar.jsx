import React from 'react';
import SignedInNav from './SignedInNav';
import SignedOutNav from './SignedOutNav';
import useStore from "../store/UserStore";
import { useCookies } from 'react-cookie';

function Navbar() {
  const {accessToken } = useStore();
    
  return accessToken ? <SignedInNav /> : <SignedOutNav />
}

export default Navbar