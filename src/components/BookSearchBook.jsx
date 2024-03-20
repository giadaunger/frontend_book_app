import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../store/FindBooksStore";

function BookSearchBook({ book, handleModal }) {
  return (
    <div className="bg-[#f8f2e9] shadow-md justify-center flex flex-col items-center rounded-lg h-full pt-2">
      { book.versions[0] &&
        <NavLink className="flex flex-col items-center">
        <img className="h-40" src={book.versions[0].book_cover.url} alt="" />
        <div className="overflow-hidden text-center">{book.title}</div>
      </NavLink>}
      <div className="overflow-hidden">
        {book.authors.map((author) => {
          return (
            <span className="text-sm text-center">{author.author.name}</span>
          );
        })}
      </div>
      <button
        onClick={() => {handleModal(book);
        }}
        className="text-sm bg-white px-2 py-0.5 rounded-lg mt-1 mb-2 sh-md"
      >
        Add to reading
      </button>
    </div>
  );
}

export default BookSearchBook;
