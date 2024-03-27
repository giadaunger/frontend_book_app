import React, { useEffect, useState } from "react";
import ReadBooksStore from "../store/ReadBooksStore";
import SvgBookshelf1 from "../assets/bookshelf/SvgBookshelf1";
import BookGoalStore from "../store/BookGoalStore";
import SvgBookshelf2 from "../assets/bookshelf/SvgBookshelf2";
import SvgBookshelf3 from "../assets/bookshelf/SvgBookshelf3";
import SvgBookshelf4 from "../assets/bookshelf/SvgBookshelf4";
import SvgBookshelf5 from "../assets/bookshelf/SvgBookshelf5";
import SvgBookshelf6 from "../assets/bookshelf/SvgBookshelf6";
import SvgBookshelf7 from "../assets/bookshelf/SvgBookshelf7";
import SvgBookshelf8 from "../assets/bookshelf/SvgBookshelf8";
import SvgBookshelf9 from "../assets/bookshelf/SvgBookshelf9";
import SvgBookshelf10 from "../assets/bookshelf/SvgBookshelf10";
import Svg1Book from "../assets/bookshelf/Svg1Book";
import Svg2Books from "../assets/bookshelf/Svg2Books";
import Svg3Books from "../assets/bookshelf/Svg3Books";
import Svg4Books from "../assets/bookshelf/Svg4Books";
import { render } from "react-dom";

function BookGoalShelf() {
  const [colorCodes, setColorCodes] = useState([]);
  const [renders, setRenders] = useState(0);
  const [renderUnder5, setRenderUnder5] = useState(0);
  const { readBooks, fetchReadBooks } = ReadBooksStore();
  const { fetchBookGoal, bookGoal } = BookGoalStore();
  const bookshelves = [
    SvgBookshelf1,
    SvgBookshelf2,
    SvgBookshelf3,
    SvgBookshelf4,
    SvgBookshelf5,
    SvgBookshelf6,
    SvgBookshelf7,
    SvgBookshelf8,
    SvgBookshelf9,
    SvgBookshelf10,
  ];
  const lessThan5Books = [Svg1Book, Svg2Books, Svg3Books, Svg4Books];

  let LastRender;
  let lastColors
  let lastBooks

  useEffect(() => {
    fetchReadBooks();
    fetchBookGoal();
  }, []);

  useEffect(() => {
    if (readBooks) {
      const tempColor = [];
      readBooks.map((book) => {
        console.log(book.book_version.book.main_category.color_code);
        tempColor.push(book.book_version.book.main_category.color_code);
      });
      setColorCodes(tempColor);
    }
  }, [readBooks]);

  useEffect(() => {
    setRenderUnder5(bookGoal % 5);
    if (renderUnder5!= 0){
      setRenders(Math.floor(bookGoal / 5)+1)
    }
    else{
      setRenders(Math.floor(bookGoal / 5))
    }
    console.log(renders)
  }, [bookGoal]);

  console.log("colorCodes:", colorCodes);
  return (
    <div className="bg-[#34271c]">
      {readBooks && (
        <>
          {bookGoal && (
            <div className="flex flex-wrap justify-center w-[2/3]">
              {Array.from({ length: renders }).map((_, index) => {
                
                let ComponentToRender
                if (index == renders-1 && renderUnder5!=0){
                  ComponentToRender = lessThan5Books[renderUnder5-1]
                } 
                else
                {ComponentToRender = bookshelves[index % bookshelves.length]};
                
                
                const start = 5 * index;
                const end = start + 5; 

                const booksToRender = readBooks.slice(start, end);
                const colorCodesToRender = colorCodes.slice(start, end);

                console.log(colorCodesToRender);
                return (
                  <div key={index}>
                    <ComponentToRender
                      colorCodesToRender={colorCodesToRender}
                      booksToRender={booksToRender}
                    />
                  </div>
                );
              })}

            </div>
          )}
        </>
      )}
    </div>
  );
}
export default BookGoalShelf;
