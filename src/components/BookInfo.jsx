import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FindBooksStore from "../store/FindBooksStore";
import BookPageStore from "../store/BookPageStore";
import ReadingBooksStore from "../store/ReadingBooksStore";
import UpdateBookVersionStore from "../store/UpdateBookVersionStore";

function BookInfo({ handleEditionPage }) {
  const { fetchPopularEditions, foundEditions } = FindBooksStore();
  const { fetchPageBook, pageBook } = BookPageStore();
  const {
    booksReadingId,
    pausedBooksReading,
    readingBooks,
    setBooksReading,
    fetchReadingBooks,
  } = ReadingBooksStore();
  const { putUnpaused, putPaused } = UpdateBookVersionStore();
  const { book_id } = useParams();
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    if (readingBooks) {
      setBooksReading(readingBooks);
    }
  }, [readingBooks]);

  async function unpauseBook() {
    const shelf = readingBooks.find(
      (el) => el.book_version.book.id == pageBook.id
    );
    console.log("shelf", shelf);
    const response = await putUnpaused(shelf.book_version_id);
    try {
      if (response === true) {
        const res = await fetchReadingBooks();
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  }

  async function pauseBook() {
    const shelf = readingBooks.find(
      (el) => el.book_version.book.id == pageBook.id
    );
    console.log("shelf", shelf);
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
    <div>
      {pageBook && (
        <div className="p-4 flex flex-col items-center text-center bg-[#f8f2e9]">
          <h1 className="text-xl mb-2">{pageBook.title}</h1>
          {foundEditions && (
            <img
              className="h-[35vh]"
              src={foundEditions[0].book_cover.url}
              alt=""
            />
          )}
          <div className="flex gap-2">
            {pageBook.authors.map((author) => {
              return <div>{author.author.name}</div>;
            })}
          </div>
          <div>editions: {foundEditions.length}</div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div>Genres:</div>
            <div
              className={`bg-[${pageBook.main_category.color_code}] rounded-full px-2 py-1    `}
            >
              {pageBook.main_category.name}
            </div>
            <ul className="flex gap-4 mt-2 flex-wrap justify-around">
              {pageBook.sub_categories.map((genre) => {
                {
                }
                return (
                  <div
                    className={`text-sm rounded-full px-1 py-0.5 bg-[${genre.category.color_code}]`}
                  >
                    {genre.category.name}
                  </div>
                );
              })}
            </ul>
            {booksReadingId && (
              <div>
                {booksReadingId.includes(pageBook.id) ? (
                  <div className="flex flex-col justify-center items-center">
                    <div className="border-2 border-[#f2d2ba] px-2 py-1 rounded-full mt-2">
                      Currently Reading
                    </div>
                    <button
                      onClick={() => {pauseBook();
                      }}
                      className="text-sm bg-white px-2 py-1 rounded-full mt-2 shadow-md"
                    >
                      Pause Book
                    </button>
                    <button
                      onClick={() => handleEditionPage()}
                      className="text-sm bg-white px-2 py-1 rounded-full mt-2 shadow-md"
                    >
                      Change edition
                    </button>
                  </div>
                ) : (
                  <div>
                    {pausedBooksReading.some((el) => el.id == pageBook.id) ? (
                      <div className="flex flex-col justify-center items-center">
                        <div className="border-2 border-[#f2d2ba] px-2 py-1 rounded-full mt-2">
                          Book Paused
                        </div>
                        <button
                          onClick={() => unpauseBook()}
                          className="text-sm bg-white px-2 py-1 rounded-full mt-2 shadow-md"
                        >
                          Unpause book
                        </button>
                      </div>
                    ) : (
                      <button className="bg-white px-2 py-1 rounded-full mt-2 shadow-md">
                        Start Reading
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="mt-2">Description:</div>
            <div>
              {foundEditions && (
                <div className="text-xs">{foundEditions[0].description}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookInfo;
