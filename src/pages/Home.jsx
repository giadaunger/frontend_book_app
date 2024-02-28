import React from 'react'
import SignedInHome from './SignedInHome'
import SignedOutHome from './SignedOutHome'

function Home() {
  const isLoggedIn = false
    return isLoggedIn ? <SignedInHome /> : <SignedOutHome />
}

export default Home