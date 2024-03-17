import React from 'react';
import SignedInNav from './SignedInNav';
import SignedOutNav from './SignedOutNav';
import useStore from "../store/UserStore";
import { useCookies } from 'react-cookie';

function Navbar() {
  const [cookies] = useCookies(['accessToken']);
  const { accessToken } = useStore();
  
  return cookies.accessToken ? <SignedInNav accessToken={accessToken} /> : <SignedOutNav />;
}

export default Navbar;
