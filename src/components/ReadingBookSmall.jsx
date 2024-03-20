import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";

function ReadingBookSmall({ book, setPageModal }) {
  const [persentage, setPersentage] = useState(0);

  useEffect(() => {
    if (book.pages_read > 0) {
      setPersentage(book.pages_read / book.book_version.page_count);
    } else {
      setPersentage(0);
    }
  }, []);

  {
    console.log("book", book);
  }
  return (
    <div>
      <div className="bg-[#f8f2e9] mx-auto min-w-72 shadow-lg flex p-6 gap-10 rounded-lg">
        <div>
          <ProgressBar
            completed={Math.floor(persentage * 100)}
            height="150px"
            borderRadius="10px"
            bgColor={book.book_version.book.main_category.color_code}
            baseBgColor="#d1c7b8"
            className="w-20 border-white border-4 rounded-xl"
          />
        </div>
        <div className="">
          <div>{book.book_version.title}</div>
          <div className="">
            {book.pages_read > 0 ? book.pages_read : 0} /{" "}
            {book.book_version.page_count} pages
          </div>
          <div>{persentage}% done</div>
          <button
            onClick={() => setPageModal(true)}
            className="bg-[#ffffff] py-2 px-3 rounded-lg mt-2 shadow-md"
          >
            update page count
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReadingBookSmall;
