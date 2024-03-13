import React from 'react'
import ReadingBooks from '../components/ReadingBooks'

function SignedInHome() {
  return (
    <div className="container mx-auto md:w-2/3 w-11/12">
      <div className='bg-green'>
        <ReadingBooks/>
      </div>
    </div>
  )
}

export default SignedInHome