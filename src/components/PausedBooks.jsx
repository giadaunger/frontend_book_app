import React from 'react'
import ReadingBooksStore from '../store/ReadingBooksStore'
import { NavLink } from 'react-router-dom'

function PausedBooks() {
    const {readingBooks} = ReadingBooksStore()
  return (
    <div>{readingBooks &&
        readingBooks.filter((el) => el.paused === true).map(book =>{
          return(
              <NavLink to={`/bookpage/${book.book_version.book.id}`}>
                  <img src={book.book_version.book_cover.url} alt="" />
                  {book.book_version.book.title}
              </NavLink>
          )
        })}</div>
  )
}

export default PausedBooks