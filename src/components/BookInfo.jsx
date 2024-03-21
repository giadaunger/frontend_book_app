import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FindBooksStore from "../store/FindBooksStore";
import BookPageStore from "../store/BookPageStore";

function BookInfo() {
  const { fetchPopularEditions, foundEditions } = FindBooksStore();
  const { fetchPageBook, pageBook } = BookPageStore();
  const { book_id } = useParams();
;
  return (
    <div>
      {pageBook && (
        <div className="p-4 flex flex-col items-center text-center bg-[#f8f2e9]">
          <h1 className="text-xl mb-2">{pageBook.title}</h1>
          {console.log(pageBook)}
          {foundEditions && (
            <img
              className="h-[35vh]"
              src={foundEditions[0].book_cover.url}
              alt=""
            />
          )}
          <div className="flex gap-2">
            {pageBook.authors.map((author) => {
              return (
                <div>
                  {console.log(author)}
                  {author.author.name}
                </div>
              );
            })}
          </div>
          <div>editions: {foundEditions.length}</div>
          <div className="flex flex-col items-center justify-center">
              <div>Genres:</div>
              <div
                className={`bg-[${pageBook.main_category.color_code}] rounded-full px-2 py-1    `}
              >
                {pageBook.main_category.name}
              </div>
              <ul className="flex gap-4 mt-2">
                {console.log("genres: ",    pageBook.sub_categories)}
                {pageBook.sub_categories.map((genre) => {
                {console.log(genre.category.color_code)}
                  return <div className={`text-sm rounded-full px-1 py-0.5 bg-[${genre.category.color_code}]`}>{genre.category.name}</div>;
                })}
              </ul>
                      </div>
          </div>
      )}
    </div>
  )
}

export default BookInfo