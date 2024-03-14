import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import useStore from "../store/ReadingBooksStore";
import { useCookies } from "react-cookie";
function ReadingBooks() {
  const { setReadingBooks, readingBooks, fetchReadingBooks } = useStore();
  const [cookies] = useCookies(["user"]);

  useEffect(() => {
    console.log(cookies.user);
    const books = fetchReadingBooks();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-[#f8f2e9] p-2 rounded-lg shadow-md mx-auto">Currently Reading</div>
      <div className="container mx-auto flex flex-col md:flex-row gap-4">
        {readingBooks &&
          readingBooks.map((book) => {
            return (
              <div className="bg-[#f8f2e9] min-w-60 shadow-lg flex p-6 gap-10 rounded-lg">
                <div>
                  {console.log(Math.floor(book.pages_read/book.book.page_count))}
                  <ProgressBar completed={Math.floor((book.pages_read/book.book.page_count)*100)} height="150px" borderRadius="10px"
                  bgColor={book.book.main_category.color_code} baseBgColor="#d1c7b8" className="w-20 border-white border-4 rounded-xl"/>
                </div>
                <div className="">
                  <div>{book.book.title}</div>
                  {console.log(book.book.main_category.color_code)}
                  <div className="">
                    {book.pages_read} / {book.book.page_count} pages
                  </div>
                  <div>
                    {Math.floor((book.pages_read/book.book.page_count)*100)}% done
                  </div>
                  <button className="bg-[#ffffff] py-2 px-3 rounded-lg mt-2 shadow-md">
                    update page count
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ReadingBooks;
