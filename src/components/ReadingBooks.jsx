import React, { useEffect, useState, useRef } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import useStore from "../store/ReadingBooksStore";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
function ReadingBooks() {
  const { setReadingBooks, readingBooks, fetchReadingBooks } = useStore();
  const [cookies] = useCookies(["user"]);
  const [pageModal, setPageModal] = useState(false);
  const [bookPage, setBookPage] = useState(0);
  const ref = useRef(null);

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
                  setBookPage(e.target.value);
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
                onClick={() => {}}
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
        {readingBooks.length < 4 &&
          readingBooks.map((book) => {
            return (
              <div className="bg-[#f8f2e9] mx-auto min-w-72 shadow-lg flex p-6 gap-10 rounded-lg">
                <div>
                  <ProgressBar
                    completed={Math.floor(
                      (book.pages_read / book.book.page_count) * 100
                    )}
                    height="150px"
                    borderRadius="10px"
                    bgColor={book.book.main_category.color_code}
                    baseBgColor="#d1c7b8"
                    className="w-20 border-white border-4 rounded-xl"
                  />
                </div>
                <div className="">
                  <div>{book.book.title}</div>
                  <div className="">
                    {book.pages_read} / {book.book.page_count} pages
                  </div>
                  <div>
                    {Math.floor((book.pages_read / book.book.page_count) * 100)}
                    % done
                  </div>
                  <button
                    onClick={() => {
                      setPageModal(true);
                    }}
                    className="bg-[#ffffff] py-2 px-3 rounded-lg mt-2 shadow-md"
                  >
                    update page count
                  </button>
                </div>
              </div>
            );
          })}
        {readingBooks.length > 3 && (
          <div className="flex flex-col items-center">
            <div className="flex flex-col lg:flex-row mx-auto gap-4 min-w-[60vw]">
              {readingBooks.slice(0, 3).map((book) => {
                return (
                  <div className="bg-[#f8f2e9] mx-auto min-w-72 shadow-lg flex p-6 gap-10 rounded-lg">
                    <div> 
                      <ProgressBar
                        completed={Math.floor(
                          (book.pages_read / book.book.page_count) * 100
                        )}
                        height="150px"
                        borderRadius="10px"
                        bgColor={book.book.main_category.color_code}
                        baseBgColor="#d1c7b8"
                        className="w-20 border-white border-4 rounded-xl"
                      />
                    </div>
                    <div className="">
                      <div>{book.book.title}</div>
                      <div className="">
                        {book.pages_read} / {book.book.page_count} pages
                      </div>
                      <div>
                        {Math.floor(
                          (book.pages_read / book.book.page_count) * 100
                        )}
                        % done
                      </div>
                      <button
                        onClick={() => {
                          setBookPage(book.pages_read), setPageModal(true);
                        }}
                        className="bg-[#ffffff] py-2 px-3 rounded-lg mt-2 shadow-md"
                      >
                        update page count
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <NavLink>
              <button className="mt-4 py-1 px-2 rounded-lg bg-[#f8f2e9] shadow-md">
                See more
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadingBooks;
