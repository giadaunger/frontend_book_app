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
  const [currentBook, setCurrentBook] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const ref = useRef(null);

  useEffect(() => {
    async function fetch() {
      fetchReadingBooks();
    }
    fetch();
  }, []);

  useEffect(() => {
    if (readingBooks) {
      setBooksReading(readingBooks);
    }
  }, [readingBooks]);

  async function addBook(event, book) {
    event.preventDefault();
    const response = await addToReading(book.id);
    if (response === true) {
      fetchReadingBooks();
      setBookAddModal(false);
      setAddedModal(true);
    }
  }

  async function fetchEditions() { }

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setBookAddModal(false);
        setAddedModal(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  async function handleModal(book) {
    setCurrentBook(book);
    await fetchPopularEditions(book.id);
    if (foundEditions) {
      setEditions(foundEditions);
    }
    setBookAddModal(true);
  }

  // Pagination
  let currentBooks = [];
  if (Array.isArray(foundBooks)) {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentBooks = foundBooks.filter(el => el.versions[0]).slice(indexOfFirstItem, indexOfLastItem);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col justify-center">
      {addedModal && (
        <div ref={ref} className="flex justify-center">
          <div className="fixed flex justify-center items-center w-72 mt-[10vh] text-cetner bg-white shadow-md mx-auto p-4 rounded-lg">
            Book added to reading
          </div>
        </div>
      )}
      {bookAddModal && (
        <div className="">
          <div className="fixed inset-0 overflow-auto bg-gray-800 opacity-50 "></div>
          <div ref={ref} className="shadow-lg flex gap-4 flex-col fixed p-4 rounded-lg inset-x-0 mx-auto w-80 sm:w-96 mt-[10vh] bg-white">
            <div className="flex flex-col gap-4 mx-auto">
              <div>Choose your edition</div>
              <div className="flex justify-center gap-4">
                {foundEditions ? (
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center gap-4">
                      {foundEditions.slice(0, 3).map((version) => {
                        return (
                          <button onClick={(e) => addBook(e, version)} className="text-sm text-center">
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
            <button onClick={(e) => { }} className="bg-blue-500 shadow-md text-white py-1 mx-auto px-3 rounded-lg">
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
        {console.log(currentBooks)}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-2 gap-x-3 md:w-2/3 w-11/12 mt-10">
          {currentBooks.filter(el => el.versions[0]).map((book) => {
            return (
              <div key={book.id}>
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
        <nav className="flex justify-center my-4">
          <ul className="flex">
            {currentPage > 1 && (
              <li>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="inline mx-1 px-2 py-1 border border-black rounded transition duration-300 hover:scale-125 hover:bg-[#ccebf5] hover:border-[#71bfd9] mr-10"
                >
                  Previous
                </button>
              </li>
            )}
            {Array.from({ length: Math.ceil(foundBooks.length / itemsPerPage) }, (_, i) => {
              if (
                i === 0 || 
                i === currentPage - 1 || 
                i === Math.ceil(foundBooks.length / itemsPerPage) - 1 || 
                (i >= currentPage - 1 && i <= currentPage + 1) ||
                (i === currentPage - 3 && currentPage > 4) || 
                (i === currentPage + 1 && currentPage < Math.ceil(foundBooks.length / itemsPerPage) - 1) 
              ) {
                return (
                  <li key={i} className="flex">
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`inline mx-1 px-2 py-1 border border-black rounded transition duration-300 hover:scale-125 hover:bg-[#ccebf5] hover:border-[#71bfd9] ${currentPage === i + 1 ? 'bg-[#f5dece] border border-[#e8a372]' : ''}`}
                    >
                      {i + 1}
                    </button>
                  </li>
                );
              } else if ((i === currentPage - 4 && currentPage > 4) || (i === currentPage + 3 && currentPage < Math.ceil(foundBooks.length / itemsPerPage) - 3)) {
                return <li key={i}>...</li>;
              }
              return null;
            })}
            {currentPage < Math.ceil(foundBooks.length / itemsPerPage) && (
              <li>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="inline mx-1 px-2 py-1 border border-black rounded transition duration-300 hover:scale-125 hover:bg-[#ccebf5] hover:border-[#71bfd9] ml-10"
                >
                  Next
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default FindBooks;
