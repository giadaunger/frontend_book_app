import React from 'react'
import ReadingBooksStore from '../store/ReadingBooksStore'

function PausedBooks() {
    const {readingBooks} = ReadingBooksStore()
  return (
    <div>{readingBooks &&
        readingBooks.filter((el) => el.paused === true).map(book =>{
          return(
              <div>
                  <img src={book.book_version.book_cover.url} alt="" />
                  {book.book_version.book.title}
              </div>
          )
        })}</div>
  )
}

export default PausedBooks