import React, { useEffect, useState } from "react";
import ReadingBooksStore from "../store/ReadingBooksStore";
import PausedBooks from "../components/PausedBooks";
import ReadBooks from "../components/ReadBooks";
import BooksBeingRead from "../components/BooksBeingRead";
import ReadBooksStore from "../store/ReadBooksStore";
import { useParams } from "react-router-dom";

function MyBooks() {
  const { fetchReadingBooks } = ReadingBooksStore();
  const { fetchReadBooks } = ReadBooksStore();
  const [pageTab, setPageTab] = useState("reading");
  const [readingTabColor, setReadingTabColor] = useState();
  const [readTabColor, setReadTabColor] = useState("#ffffff");
  const [pausedTabColor, setPausedTabColor] = useState("#fffffff");
  const { tab } = useParams();

  useEffect(() => {
    fetchReadingBooks();
    fetchReadBooks();
  }, []);

  useEffect(() => {
    if (tab === "read") {
      handleReadPage();
    } else if (tab === "paused") {
      handlePausedPage();
    } else {
      handleReadingPage();
    }
  }, []);

  function handleReadingPage() {
    setPageTab("reading");
    setReadingTabColor("#f8f2e9")
    setReadTabColor("#ffffff")
    setPausedTabColor("#ffffff")
  }

  function handleReadPage() {
    setPageTab("read");
    setReadTabColor("#f8f2e9")
    setPausedTabColor("#ffffff")
    setReadingTabColor("#ffffff")
  }

  function handlePausedPage() {
    setPageTab("paused");
    setPausedTabColor("#f8f2e9")
    setReadingTabColor("#ffffff")
    setReadTabColor("#ffffff")

  }

  return (
    <div className="md:w-2/3 w-11/12 mx-auto">
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleReadingPage()}
          className={`bg-[${readingTabColor}] px-3 py-1 rounded-t-lg`}
        >
          Reading
        </button>
        <button
          onClick={() => handleReadPage()}
          className={`bg-[${readTabColor}] px-3 py-1 rounded-t-lg`}
        >
          Read
        </button>
        <button
          onClick={() => handlePausedPage()}
          className={`bg-[${pausedTabColor}] px-3 py-1 rounded-t-lg`}
        >
          Paused
        </button>
      </div>
      <div className="bg-[#f8f2e9] rounded-lg p-4">
          {pageTab === "reading" ? (
            <BooksBeingRead />
          ) : pageTab === "read" ? (
            <ReadBooks />
          ) : pageTab === "paused" ? (
            <PausedBooks />
          ) : (
            <div></div>
          )}
      </div>
    </div>
  );
}

export default MyBooks;
