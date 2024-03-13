import React, { useEffect, useState } from "react";
import useStore from "../store/ReadingBooksStore";
import { useCookies } from "react-cookie";
import bookOutline from "../assets/book_outline.svg";
import book_filled from "../assets/book_filled.svg";

function ReadingBooks() {
  const { setReadingBooks, readingBooks, fetchReadingBooks } = useStore();
  const [cookies] = useCookies(["user"]);

  useEffect(() => {
    console.log(cookies.user);
    const books = fetchReadingBooks();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      {readingBooks &&
        readingBooks.map((book) => {
          return (
            <div className="bg-gray-100 min-w-60 min-h-60 border flex p-10 gap-10">
              <div>
                <svg
                  className={`fill-[${book.book.main_category.color_code}] absolute`}
                  width="100" 
                  height="150"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="60"
                    height="120"
                    x="5"
                    y="5"
                    rx="10"
                    ry="10"
                  />
                </svg>
                <svg
                  className={`fill-[${book.book.main_category.color_code}] absolute stroke-white`}
                  width="100"  
                  height="150"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="60"
                    height="120"
                    x="5"
                    y="5"
                    rx="10"
                    ry="10"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              {/* { book &&
              <ProgressBar book={book}/>
              } */}
              <div className="mt-4 ml-10">
                <div>{book.book.title}</div>
                {console.log(book.book.main_category.color_code)}
                <div className="pt-2">
                  {book.pages_read} / {book.book.page_count} pages
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ReadingBooks;
