import React, { useEffect, useRef, useState } from "react";
import ReadingBooksStore from "../store/ReadingBooksStore";
import { NavLink } from "react-router-dom";
import ReadBooksStore from "../store/ReadBooksStore";
import UpdateBookVersionStore from "../store/UpdateBookVersionStore";

function BooksBeingRead() {
  const { fetchReadBooks } = ReadBooksStore();
  const { readingBooks, fetchUpdatePages, fetchReadingBooks } =
    ReadingBooksStore();
  const {putPaused } = UpdateBookVersionStore();
  const [pageModal, setPageModal] = useState(false);
  const [bookPage, setBookPage] = useState(0);
  const [currentBook, setCurrentBook] = useState(null);
  const [error, setError] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setPageModal(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  async function fetch() {
    fetchReadingBooks();
    fetchReadBooks();
  }

  async function checkPagesUpdate(event, bookVersionId, bookPage) {
    event.preventDefault(); // Prevents default form submission
    try {
      const response = await fetchUpdatePages(bookVersionId, bookPage);
      if (response != null) {
        await fetch();
        setPageModal(false);
      } else {
        setError("Update failed, check internet connection and try again");
      }
    } catch (error) {
      console.error("Error during update:", error);
      setError("Error during update. Please try again later.");
    }
  }
  function handleSetPage(e) {
    if (e.target.value < 0) {
      setBookPage(0);
    } else if (e.target.value > currentBook.book_version.page_count) {
      setBookPage(currentBook.book_version.page_count);
    } else {
      setBookPage(e.target.value);
    }
  }

  async function pauseBook(book) {
    const shelf = readingBooks.find((el) => el.id == book.id);
    const response = await putPaused(shelf.book_version_id);
    try {
      if (response === true) {
        const res = await fetchReadingBooks();
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  }


  return (
    <div className="flex flex-col gap-8">
      {pageModal && (
        <div className="fixed">
          <div className="fixed inset-0 overflow-auto bg-gray-800 opacity-50 "></div>
          <div
            ref={ref}
            className="shadow-lg flex gap-4 flex-col fixed p-10 rounded-lg inset-x-0 mx-auto w-80 sm:w-96 mt-[20vh] bg-white"
          >
            <div className="flex gap-4 mx-auto">
              <label htmlFor="number">Current page: </label>
              <input
                className="w-28"
                value={bookPage}
                onChange={(e) => {
                  handleSetPage(e);
                }}
                type="number"
              />
            </div>
            <div className="flex">
              <button
                onClick={() => {
                  setPageModal(false);
                }}
                className="bg-blue-500 shadow-md text-white py-2 mx-auto px-4 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={(e) => {
                  checkPagesUpdate(e, currentBook.book_version_id, bookPage);
                }}
                className="bg-blue-500 shadow-md text-white py-2 mx-auto px-4 rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {readingBooks &&
        readingBooks
          .filter((el) => el.paused === false)
          .map((book) => {
            return (
              <div className="flex gap-4">
                <NavLink
                  to={`/bookpage/${book.book_version.book.id}`}
                  className="flex gap-4"
                >
                  <img src={book.book_version.book_cover.url} alt="" />
                </NavLink>
                <div className="flex flex-col gap-2 items-center mt-2">
                  {book.book_version.book.title}
                  <button
                    onClick={() => {
                      setCurrentBook(book),
                        setPageModal(true),
                        setBookPage(book.pages_read);
                    }}
                    className="bg-[#ffffff] text-sm mx-auto py-2 px-3 rounded-full mt-2 shadow-md"
                  >
                    update page count
                  </button>
                  <button
                    onClick={() => {
                      pauseBook(book);
                    }}
                    className="text-sm mx-auto bg-white px-2 py-1 rounded-full mt-2 shadow-md"
                  >
                    Pause Book
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default BooksBeingRead;
