import React from "react";
import SignedInHome from "./SignedInHome";
import SignedOutHome from "./SignedOutHome";
import useStore from "../store/UserStore";
import { useCookies } from 'react-cookie';

function Home() {
  const [cookies] = useCookies(['accessToken']);
  const {accessToken } = useStore();

  return cookies.accessToken ? <SignedInHome /> : <SignedOutHome />;
}

export default Home;
