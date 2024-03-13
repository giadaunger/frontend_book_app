import React, { useEffect } from 'react'
import useStore from '../store/ReadingBooksStore'
import { useCookies } from 'react-cookie';

function ReadingBooks() {
  const [cookies] = useCookies(['user']);
  const { setReadingBooks, readingBooks, fetchReadingBooks } = useStore();

  useEffect(() =>{
    console.log(cookies.user)
    const books = fetchReadingBooks()
    console.log("after fetch")
    console.log("ReadingBooks", readingBooks)
  },[])

  return (
    <div>
      {console.log(readingBooks)}
      { readingBooks &&
      readingBooks.map((book)=> {
        return <div>{book.book.title}</div>
      })}
    </div>
  )
}

export default ReadingBooks