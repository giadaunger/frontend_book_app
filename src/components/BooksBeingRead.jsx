import React from 'react'
import ReadingBooksStore from '../store/ReadingBooksStore'
import { NavLink } from 'react-router-dom'

function BooksBeingRead() {
    const {readingBooks} = ReadingBooksStore()
  return (
    <div className="flex flex-col gap-8">{readingBooks &&
        readingBooks.filter((el) => el.paused === false).map(book =>{
          return(
              <NavLink to={`/bookpage/${book.book_version.book.id}`} className="flex gap-4">
                  <img src={book.book_version.book_cover.url} alt="" />
                  {book.book_version.book.title}
              </NavLink>
          )
        })}</div>
  )
}

export default BooksBeingRead