import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import FindBooksStore from "../store/FindBooksStore";
import BookSearchBook from "../components/BookSearchBook";
import ReadingBookStore from "../store/ReadingBooksStore";
import { NavLink } from "react-router-dom";

function FindBooks() {
  const { foundBooks, fetchPopularEditions, foundEditions, addToReading } =
    FindBooksStore();
  const { fetchReadingBooks, readingBooks, booksReading, setBooksReading } = ReadingBookStore();
  const [bookAddModal, setBookAddModal] = useState(false);
  const [addedModal, setAddedModal] = useState(false);
  const [editions, setEditions] = useState([]);
  const [currentBook, setCurrentBook] = useState()
  const ref = useRef(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const PAGE_SIZE = 10; // Number of items per page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, foundBooks.length);
  // const booksToDisplay = foundBooks.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };


  useEffect(() => {
    async function fetch() {
      fetchReadingBooks()
    }
    fetch();
  }, []);

  useEffect(() => {
    if (readingBooks) {
      setBooksReading(readingBooks)
    }
  }, [readingBooks])

  async function addBook(event, book) {
    event.preventDefault;
    const response = await addToReading(book.id);
    if (response == true) {
      async function fetch() {
        fetchReadingBooks()
      }
      fetch();
      setBookAddModal(false);
      setAddedModal(true);
    }
  }

  async function fetchEditions() { }

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setBookAddModal(false);
        setAddedModal(false)
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  async function handleModal(book) {
    setCurrentBook(book)
    await fetchPopularEditions(book.id);
    if (foundEditions) {
      setEditions(foundEditions);
    }
    setBookAddModal(true);
  }

  return (
    <div className="">
      {addedModal && (
        <div
          ref={ref}
          className="flex justify-center">
          <div className="fixed flex justify-center items-center w-72 mt-[10vh] text-cetner bg-white shadow-md mx-auto p-4 rounded-lg">
            Book added to reading
          </div>
        </div>
      )}
      {bookAddModal && (
        <div className="">
          <div className="fixed inset-0 overflow-auto bg-gray-800 opacity-50 "></div>
          <div
            ref={ref}
            className="shadow-lg flex gap-4 flex-col fixed p-4 rounded-lg inset-x-0 mx-auto w-80 sm:w-96 mt-[10vh] bg-white"
          >
            <div className="flex flex-col gap-4 mx-auto">
              <div>Choose your edition</div>
              <div className="flex justify-center gap-4">
                {foundEditions ? (
                  <div className="flex flex-col items-center">
                    <div className="flex j  ustify-center gap-4">
                      {foundEditions.slice(0, 3).map((version) => {
                        return (
                          <button
                            onClick={(e) => addBook(e, version)}
                            className="text-sm text-center"
                          >
                            <img src={version.book_cover.url} alt="" />
                            <div> number of pages</div>
                            <div>{version.page_count}</div>
                            {version.isEbook}
                          </button>
                        );
                      })}
                    </div>
                    {foundEditions.length > 4 && (
                      <NavLink to={`/bookpage/${currentBook.id}/editions`} className="text-center text-blue-500 mt-2">
                        See more
                      </NavLink>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center gap-4">
                      {currentBook.versions.slice(0, 3).map((version) => {
                        return (
                          <button className="text-sm text-center">
                            <img src={version.book_cover.url} alt="" />
                            <div> number of pages</div>
                            <div>{version.page_count}</div>
                            {version.isEbook}
                          </button>
                        );
                      })}
                    </div>
                    {currentBook.versions.length > 4 && (
                      <button className="text-center text-blue-500 mt-2">
                        See more
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={(e) => { }}
              className="bg-blue-500 shadow-md text-white py-1 mx-auto px-3 rounded-lg"
            >
              None fit your book?
            </button>
            <div className="flex">
              <button
                onClick={() => {
                  setBookAddModal(false);
                }}
                className="bg-blue-500 shadow-md text-white py-1 mx-auto px-3 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <SearchBar />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-2 gap-x-3 md:w-2/3 w-11/12 mt-10">
          {foundBooks &&
            foundBooks.filter((el) => el.versions.length > 0).map((book) => {
              return (
                <div>
                  {book && (
                    <BookSearchBook
                      setCurrentBook={() => setCurrentBook()}
                      book={book}
                      handleModal={(e) => handleModal(e)}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span> / <span>{totalPages}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FindBooks;
