import React, { useEffect } from 'react'
import useStore from '../store/ReadingBooks'
import { useCookies } from 'react-cookie';


function ReadingBooks() {
  const [cookies] = useCookies(['user']);
  const { setReadingBooks, readingBooks, fetchReadingBooks } = useStore();

  useEffect(() =>{
    console.log(cookies.user)
    const books = fetchReadingBooks(1)
    console.log("afetr fetch")
    console.log(readingBooks)
  },[])

  return (
    <div>
      {/* {readingBooks.map((book)=> {
        <div>{book}</div>
      })} */}
    </div>
  )
}

export default ReadingBooks