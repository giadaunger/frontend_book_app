import React, { useEffect } from 'react'
import useStore from '../store/ReadingBooksStore'
import { useCookies } from 'react-cookie';

function ReadingBooks() {
  const [cookies] = useCookies(['user']);
  const { setReadingBooks, readingBooks, fetchReadingBooks } = useStore();

  useEffect(() =>{
    console.log(cookies.user)
    const books = fetchReadingBooks()
  },[])

  return (
    <div className='flex flex-col gap-5'>
      { readingBooks &&
      readingBooks.map((book)=> {
        return <div className='bg-gray-500 min-w-60 min-h-60 border'>
          <div className=''>{book.book.title}</div>
          </div>
      })}
    </div>
  )
}

export default ReadingBooks