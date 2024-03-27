import React from "react";
import ReadBooksStore from "../store/ReadBooksStore";
import { NavLink } from "react-router-dom";

function ReadBooks() {
  const { readBooks } = ReadBooksStore();
  return (
    <div>
      {readBooks &&
        readBooks.map((book) => {
          return (
            <div className="flex gap-4">
              <NavLink to={`/bookpage/${book.book_version.book.id}`}>
                <img src={book.book_version.book_cover.url} alt="" />
              </NavLink>
              <div className="flex flex-col gap-2 mt-2">
                <div>{book.book_version.book.title}</div>
                <div>Finished: {book.finished_date.slice(0,10)}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ReadBooks;
