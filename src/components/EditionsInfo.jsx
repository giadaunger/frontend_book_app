import React, { useEffect, useState } from "react";
import { useLinkClickHandler, useParams } from "react-router-dom";
import FindBooksStore from "../store/FindBooksStore";
import BookPageStore from "../store/BookPageStore";

function EditionsInfo() {
  const { fetchPopularEditions, foundEditions } = FindBooksStore();
  const { fetchPageBook, pageBook } = BookPageStore();
  const { book_id } = useParams();
  const [onBook, setOnBook] = useState(true);
  const [bookTabColor, setBookTabColor] = useState("#f8f2e9");
  const [editionTabColor, setEditionTabColor] = useState("#fcf8f4");

  return (
    <div>
      {foundEditions && (
        <div className="p-4 flex flex-col items-center text-center bg-[#f8f2e9]">
            <div className="text-xl" >Editions</div>
            <ul className="flex flex-col gap-8 mt-2">
                {foundEditions.map((edition)=>{
                    return(
                        <li className="flex gap-8">
                            <img src={edition.book_cover.url} alt="" />
                            <div className="mt-4 flex flex-col gap-2">
                                <div>Page Count: {edition.page_count}</div>
                                <div>Publisher: {edition.publisher}</div>
                                <div>Ebook: {edition.is_ebook ? 
                                "Yes": "No"
                                }</div>
                                {
                                    <button className="bg-white px-2 py-1 rounded-full">
                                    Add to reading
                                </button>}
                            </div>

                        </li>
                    )
                })}
            </ul>
        </div>
      )}
    </div>
  );
}

export default EditionsInfo;
