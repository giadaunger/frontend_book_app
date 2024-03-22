import React from 'react'
import ReadBooksStore from '../store/ReadBooksStore'

function ReadBooks() {
    const {readBooks} = ReadBooksStore()
  return (
    <div>{readBooks &&
        readBooks.map(book =>{
          return(
              <div>
                  <img src={book.book_version.book_cover.url} alt="" />
                  {book.book_version.book.title}
              </div>
          )
        })}</div>

  )
}

export default ReadBooks