import React, { useEffect, useRef, useState } from "react";
import { useLinkClickHandler, useParams } from "react-router-dom";
import FindBooksStore from "../store/FindBooksStore";
import BookPageStore from "../store/BookPageStore";
import ReadingBooksStore from "../store/ReadingBooksStore";
import UpdateBookVersionStore from "../store/UpdateBookVersionStore";

function EditionsInfo() {
  const { fetchPopularEditions, foundEditions, addToReading } = FindBooksStore();
  const { fetchPageBook, pageBook } = BookPageStore();
  const {
    readingBooks,
    booksReadingId,
    fetchReadingBooks,
    pausedBooksReading,
    setBooksReading,
  } = ReadingBooksStore();
  const { putPaused, putUnpaused,changeEdition } = UpdateBookVersionStore();
  const [onBook, setOnBook] = useState(true);
  const [changeModal, setChangeModal] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setChangeModal(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  async function pauseBook() {
    const res = await putPaused(currentVersion.id);
    if (res) {
      await fetchReadingBooks();
    }
    setChangeModal(false);
  }

  useEffect(() => {
    if (readingBooks) {
      setBooksReading(readingBooks);
    }
  }, [readingBooks]);

  async function unpause_book() {
    const shelf = readingBooks.find(
      (el) => el.book_version.book.id == pageBook.id
    );
    const response = await putUnpaused(shelf.book_version_id);
    try {
      if (response === true) {
        const res = await fetchReadingBooks();
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  }

 async function changeBookEdition(){
    const shelf = readingBooks.find(
        (el) => el.book_version.book.id == pageBook.id
      )
      const response = await changeEdition(shelf.book_version_id, currentVersion.id);
      try {
        if (response === true) {
          const res = await fetchReadingBooks();
          setChangeModal(false)
        }
      } catch (error) {
        console.error("Error during update:", error);
      }
    
  }

  async function addBook(book) {
    const response = await addToReading(book.id);
    if (response == true) {
        async function fetch(){
            fetchReadingBooks()
        }
        fetch();
      setBookAddModal(false);
      setAddedModal(true);
    }
  }


  return (
    <div>
      {changeModal && (
        <div className="fixed">
          <div className="fixed inset-0 overflow-auto bg-gray-800 opacity-50 "></div>
          <div
            ref={ref}
            className="shadow-lg flex gap-4 flex-col fixed p-10 rounded-lg inset-x-0 mx-auto w-80 sm:w-96 mt-[5vh] bg-white"
          >
            <div className="text-center">Change Edition?</div>
            <div className="text-center">Book may be marked as read if recorded pages are higher than edition pages, proceed?</div>
            <div className="flex">
              <button
                onClick={() => setChangeModal(false)}
                className="bg-blue-500 shadow-md text-white py-2 mx-auto px-4 rounded-lg"
              >
                No
              </button>
              <button
                onClick={() => changeBookEdition()}
                className="bg-blue-500 shadow-md text-white py-2 mx-auto px-4 rounded-lg"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {foundEditions && (
        <div className="p-4 flex flex-col items-center text-center bg-[#f8f2e9]">
          <div className="text-xl">Editions</div>
          <ul className="flex flex-col gap-8 mt-2">
            {foundEditions.map((edition) => {
              return (
                <li className="flex gap-4">
                  <img src={edition.book_cover.url} alt="" />
                  <div className="mt-4 flex flex-col gap-2 text-left">
                    <div>Page Count: {edition.page_count}</div>
                    <div>Publisher: {edition.publisher}</div>
                    <div>Ebook: {edition.is_ebook ? "Yes" : "No"}</div>
                    {booksReadingId && (
                      <>
                        {readingBooks.some((el) => el.book_version.book_id === pageBook.id) ? (
                          <div>
                            {readingBooks.some(
                              (el) => el.book_version_id == edition.id
                            ) ? (
                              <>
                                {readingBooks.find(
                              (el) => el.book_version_id == edition.id
                            ).paused ? (
                                  <button className="bg-white px-2 py-1 rounded-full shadow-md" onClick={()=> unpause_book()} >Unpause Book</button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setCurrentVersion(edition),
                                      pauseBook();
                                    }}
                                    className="bg-white px-2 py-1 rounded-full shadow-md"
                                  >
                                    Pause Book
                                  </button>
                                )}
                              </>
                            ) : (
                              <button
                                onClick={() => {setCurrentVersion(edition), setChangeModal(true)}}
                                className="bg-white px-2 py-1 rounded-full shadow-md"
                              >
                                Change edition
                              </button>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => {addBook(edition)}}
                            className="bg-white px-2 py-1 rounded-full"
                          >
                            Add to reading
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EditionsInfo;
