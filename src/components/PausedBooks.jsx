import React from "react";
import ReadingBooksStore from "../store/ReadingBooksStore";
import { NavLink } from "react-router-dom";
import UpdateBookVersionStore from "../store/UpdateBookVersionStore";

function PausedBooks() {
  const { readingBooks, fetchReadingBooks } = ReadingBooksStore();
  const { putUnpaused } = UpdateBookVersionStore();

  async function unpauseBook(book) {
    const shelf = readingBooks.find(
      (el) => el.id == book.id
    )
    const response = await putUnpaused(shelf.book_version_id);
    try {
      if (response === true) {
        const res = await fetchReadingBooks();
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  }

  return (
    <div>
      {readingBooks &&
        readingBooks
          .filter((el) => el.paused === true)
          .map((book) => {
            return (
              <div className="flex gap-4">
                <NavLink to={`/bookpage/${book.book_version.book.id}`}>
                  <img src={book.book_version.book_cover.url} alt="" />
                </NavLink>
                <div className="flex flex-col gap-2 items-center mt-2">
                    {book.book_version.book.title}
                    <button
                      onClick={() => unpauseBook(book)}
                      className="text-sm bg-white px-2 py-1 rounded-full mt-2 shadow-md"
                    >
                      Unpause book
                    </button>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default PausedBooks;
