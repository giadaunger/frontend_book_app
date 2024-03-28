import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReadingBooksStore from "../store/ReadingBooksStore";


function BookSearchBook({ book, handleModal, setCurrentBook}) {
    const {readingBooks, booksReadingId} = ReadingBooksStore()
    return (
    <div className="bg-[#f8f2e9] shadow-md h-full justify-center flex flex-col items-center rounded-lg h-full pt-2">
      {book.versions[0] && (
        <NavLink to={`/bookpage/${book.id}`} className="flex flex-col items-center">
          <img className="h-40" src={book.versions[0].book_cover.url} alt="" />
          <div className="overflow-hidden text-center">{book.title}</div>
        </NavLink>
      )}
      <div className="overflow-hidden">
        {book.authors.map((author) => {
          return (
            <span className="text-sm text-center">{author.author.name}</span>
          );
        })}
      </div>
      { booksReadingId &&
      <div>
          {!booksReadingId.includes(book.id) ?
            <button
            onClick={() => {
                handleModal(book);
            }}
            className="text-sm bg-white px-2 py-0.5 rounded-lg mt-1 mb-2 sh-md"
            >
            Add to reading
          </button>:
          <div
          className="text-sm bg-gray-300 px-2 py-0.5 rounded-lg mt-1 mb-2 sh-md"
              >
          Currently reading
              </div>
          }
      </div>}
    </div>
  );
}

export default BookSearchBook;
