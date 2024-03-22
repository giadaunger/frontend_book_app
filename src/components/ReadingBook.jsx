import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function ReadingBook({ book, setPageModal, setBookPage, setCurrentBook }) {
  const [percentage, setPercentage] = useState(0);
  const [color, setColor] = useState(0);
  const [label, setLabel] = useState(false)

  useEffect(() => {
    if (book.pages_read > 0) {
      setPercentage(
        Math.floor((book.pages_read / book.book_version.page_count) * 100)
      );
    } else {
      setPercentage(0);
    }

    if (book.book_version.book.main_category.color_code) {
      setColor(book.book_version.book.main_category.color_code);
    }
    else{
        setColor("#000000")
    }

  }, []);

useEffect(() => {
    if (book.pages_read > 0) {
      setPercentage(
        Math.floor((book.pages_read / book.book_version.page_count) * 100)
      );
    } else {
      setPercentage(0);
    }

    if (book.book_version.book.main_category.color_code) {
      setColor(book.book_version.book.main_category.color_code);
    }
    else{
        setColor("#000000")
    }
  }, [book])

  useEffect(()=>{
    if (percentage < 50){
        setLabel(false)
    }
    else{
        setLabel(true)
    }
  },[percentage])

  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#f8f2e9] mx-auto w-11/12 h-full shadow-lg flex p-6 gap-10 rounded-lg">
        <div>
          <ProgressBar
            completed={percentage}
            height="150px"
            borderRadius="10px"
            bgColor={color}
            baseBgColor="#d1c7b8"
            className="w-20 border-white border-4 rounded-xl"
            isLabelVisible={label}
          />
        </div>
        <div className="overflow-clip">
          <NavLink to={`/bookpage/${book.book_version.book.id}`} className="w-40">{book.book_version.book.title}</NavLink> 
          <div className="">
            {book.pages_read}/ {book.book_version.page_count} pages
          </div>
          <div>{percentage}% done</div>
          <button
            onClick={() => {
              setCurrentBook(book) ,setPageModal(true), setBookPage(book.pages_read);
            }}
            className="bg-[#ffffff] py-2 px-3 rounded-lg mt-2 shadow-md"
          >
            update page count
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReadingBook;
