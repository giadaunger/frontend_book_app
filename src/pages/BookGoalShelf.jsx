import React, { useEffect, useState } from "react";
import ReadBooksStore from "../store/ReadBooksStore";
import SvgBooshelf1 from "../assets/bookshelf/SvgBooshelf1";
import BookGoalStore from "../store/BookGoalStore";
import SvgBooshelf2 from "../assets/bookshelf/SvgBookshelf2";

function BookGoalShelf() {
  const [colorCodes, setColorCodes] = useState([]);
  const { readBooks, fetchReadBooks } = ReadBooksStore();
  const { fetchBookGoal, bookGoal } = BookGoalStore();
  const components = [SvgBooshelf1, SvgBooshelf2];

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

  console.log("colorCodes:", colorCodes);
  return (
    <div className="bg-[#34271c]">
      {readBooks && (
        <>
          {bookGoal && (
            <div className="flex flex-wrap justify-center w-[2/3]">
              {Array.from({ length: bookGoal }).map((_, index) => {
                const ComponentToRender = components[index % components.length];
                const start = 5 * index;
                const end = start + 5; // Assuming you want slices of 5 items each time

                // Use the calculated indices to slice the readBooks array
                const booksToRender = readBooks.slice(start,end)
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
