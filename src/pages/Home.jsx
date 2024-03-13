import React from "react";
import SignedInHome from "./SignedInHome";
import SignedOutHome from "./SignedOutHome";
import useStore from "../store/UserStore";
import { useCookies } from 'react-cookie';


function Home() {
  const {accessToken } = useStore();

  return accessToken ? <SignedInHome /> : <SignedOutHome />;
}

export default Home;
