import React from "react";
import SignedInHome from "./SignedInHome";
import SignedOutHome from "./SignedOutHome";
import useStore from "../store/UserStore";
import { useCookies } from 'react-cookie';


function Home() {
  const [cookies] = useCookies(['user']);

  return cookies.user ? <SignedInHome /> : <SignedOutHome />;
}

export default Home;
