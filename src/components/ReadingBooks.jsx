import React, { useEffect, useState, useRef } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import useStore from "../store/ReadingBooksStore";
import { useCookies } from "react-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import ReadingBook from "./ReadingBook";

function ReadingBooks() {
  const { readingBooks, fetchReadingBooks, fetchUpdatePages } = useStore();
  const [cookies] = useCookies(["user"]);
  const [pageModal, setPageModal] = useState(false);
  const [bookPage, setBookPage] = useState(0);
  const [currentBook, setCurrentBook] = useState(null);
  const ref = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const books = fetchReadingBooks();
  }, []);

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

  async function checkPagesUpdate(event, bookVersionId, bookPage) {
    event.preventDefault(); // Prevents default form submission
    try {
      const response = await fetchUpdatePages(bookVersionId, bookPage);
      if (response != null) {
        fetchReadingBooks();
        setPageModal(false);
      } else {
        setError("Update failed, check internet connection and try again");
      }
    } catch (error) {
      console.error("Error during update:", error);
      setError("Error during update. Please try again later.");
    }
  }

  function goToFindBooks() {
    navigate("/findbooks");
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

  return (
    <div className="flex flex-col gap-5">
      {/* Page updater */}
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
      <div className="bg-[#f8f2e9] p-2 rounded-lg shadow-md mx-auto">
        Currently Reading
      </div>
      <div className="flex flex-col lg:flex-row mx-auto gap-4 min-w-[60vw]">
        {readingBooks &&
          readingBooks.slice(0, 3).map((book) => {
            return (
              <div>
                <ReadingBook book={book} setPageModal={(e) => setPageModal(e)} setBookPage={(e) => setBookPage(e)}/>
              </div>
            );
          })}
          <div className="flex justify-center">
            {readingBooks.length > 3 && (
                <NavLink>
                  <button className="mt-4 py-1 px-2 rounded-lg bg-[#f8f2e9] shadow-md">
                    See more
                  </button>
                </NavLink>
              )}
          </div>
        {readingBooks.length == 0 && (
          <div className="flex mx-auto flex-col justify-center items-center bg-[#f8f2e9] p-6 rounded-lg shadow-lg">
            <div>No books being read!</div>
            <button
              onClick={() => goToFindBooks()}
              className="bg-white py-1 px-2 mt-2 rounded-lg shadow-md"
            >
              Add a book to read
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadingBooks;
