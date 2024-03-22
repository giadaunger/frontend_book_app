import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FindBooksStore from "../store/FindBooksStore";
import BookPageStore from "../store/BookPageStore";
import BookInfo from "../components/BookInfo";
import EditionsInfo from "../components/EditionsInfo";
import ReadingBooksStore from "../store/ReadingBooksStore";

function BookPage() {
  const { fetchReadingBooks, readingBooks, booksReadingId, setBooksReading } =
    ReadingBooksStore();
  const { fetchPopularEditions, foundEditions } = FindBooksStore();
  const { fetchPageBook, pageBook } = BookPageStore();
  const { book_id } = useParams();
  const [onBook, setOnBook] = useState(true);
  const [bookTabColor, setBookTabColor] = useState("#f8f2e9");
  const [editionTabColor, setEditionTabColor] = useState("#fcf8f4");

  useEffect(() => {
    fetchPageBook(book_id);
    fetchPopularEditions(book_id);
    fetchReadingBooks();
  }, []);

  useEffect(() => {
    if(!booksReadingId){
        if(readingBooks){
        setBooksReading(readingBooks)
    }}
  }, [readingBooks]);


  function handleBookPage() {
    setOnBook(true);
    setBookTabColor("#f8f2e9");
    setEditionTabColor("#fcf8f4");
  }

  function handleEditionPage() {
    setOnBook(false);
    setBookTabColor("#fcf8f4");
    setEditionTabColor("#f8f2e9");
  }

  return (
    <div className="md:w-2/3 w-11/12 mx-auto">
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleBookPage()}
          className={`bg-[${bookTabColor}] px-3 py-1 rounded-t-lg`}
        >
          Book
        </button>
        <button
          onClick={() => handleEditionPage()}
          className={`bg-[${editionTabColor}] px-3 py-1 rounded-t-lg`}
        >
          Editions
        </button>
      </div>
      {onBook ? <BookInfo handleEditionPage={() => handleEditionPage()} /> : <EditionsInfo />}
    </div>
  );
}

export default BookPage;
