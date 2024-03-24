import React, { useEffect, useState } from "react";
import ReadBooksStore from "../store/ReadBooksStore";
import { NavLink } from "react-router-dom";

function BookGoalShelf() {
  const [colorCodes, setColorCodes] = useState([]);
  const { readBooks, fetchReadBooks } = ReadBooksStore();

  useEffect(() => {
    fetchReadBooks();
  }, []);

  useEffect(() => {
    if (readBooks) {
      const tempColor = []
      readBooks.map((book) => {
        console.log(book.book_version.book.main_category.color_code);
        tempColor.push(book.book_version.book.main_category.color_code);
      });
      setColorCodes(tempColor)
    }
  }, [readBooks]);

  console.log("colorCodes:", colorCodes);
  return (
    <div className="bg-[#f8f2e9]">
      <div className="absolute bg-black hidden">heeyy</div>
      <svg
        className="scale-[0.20] origin-top-left stroke-8 stroke-white fill-[#f8f2e9]"
        width="800"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <title>Layer 1</title>
          <path
            className="stroke-3"
            id="svg_2"
            d="m13,499l766,0l0,87l-766,0l0,-87z"
            opacity="undefined"
            stroke="#4a3728"
            fill="#4a3728"
          />
          <NavLink to={`/bookpage/${readBooks[0].id}`}>
            <path
              id="svg_3"
              d="m108,108l109,0l0,386l-109,0l0,-386z"
              opacity="undefined"
              fill={`${colorCodes[0]}`}
            />
          </NavLink>
          <path
            id="svg_4"
            d="m256,111l128,0l0,375l-128,0l0,-375z"
            transform="rotate(-12, 320, 298.5)"
            opacity="undefined"
            fill={`${colorCodes[1]}`}
          />
          <path
            id="svg_5"
            d="m423,152l79,0l0,342l-79,0l0,-342z"
            opacity="undefined"
            fill={`${colorCodes[2]}`}
          />
          <path
            id="svg_6"
            d="m511,70l76,0l0,424l-76,0l0,-424z"
            opacity="undefined"
            fill={`${colorCodes[3]}`}
          />
          <path
            id="svg_7"
            d="m595,124l77,0l0,370l-77,0l0,-370z"
            opacity="undefined"
            fill={`${colorCodes[4]}`}
          />
        </g>
      </svg>
    </div>
  );
}

export default BookGoalShelf;
