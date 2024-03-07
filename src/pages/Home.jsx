import React from "react";
import SignedInHome from "./SignedInHome";
import SignedOutHome from "./SignedOutHome";
import useStore from "../store/UserStore";

function Home() {
  const { user } = useStore()
  {console.log(user)}
  return user ? <SignedInHome /> : <SignedOutHome />;
}

export default Home;
