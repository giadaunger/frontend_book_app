import React from 'react'
import ReadBooksStore from '../store/ReadBooksStore'
import { NavLink } from 'react-router-dom'

function ReadBooks() {
    const {readBooks} = ReadBooksStore()
  return (
    <div>{readBooks &&
        readBooks.map(book =>{
          return(
              <NavLink to={`/bookpage/${book.book_version.book.id}`}>
                  <img src={book.book_version.book_cover.url} alt="" />
                  {book.book_version.book.title}
              </NavLink>
          )
        })}</div>

  )
}

export default ReadBooks