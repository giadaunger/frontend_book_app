import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import useStore from "../store/FindBooksStore";
import BookSearchBook from "../components/BookSearchBook";

function FindBooks() {
  const { foundBooks, fetchPopularEditions, foundEditions } = useStore();
  const [bookAddModal, setBookAddModal] =useState(false)
//   const [currentBook, setCurrentBook] =useState(null)
  const {addToReading} = useStore()
  const ref = useRef(null);

  async function addBook(event, book){
      event.preventDefault; 
      const response = await addToReading(book.id)
      console.log(response)
  }  

  async function fetchEditions(){

  }
  
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setBookAddModal(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  async function handleModal(book){
    await fetchPopularEditions(book.id)
    setBookAddModal(true)
  }


  

  return (
    <div className="">
        {bookAddModal && (
        <div className="">
          <div className="fixed inset-0 overflow-auto bg-gray-800 opacity-50 "></div>
          <div
            ref={ref}
            className="shadow-lg flex gap-4 flex-col fixed p-4 rounded-lg inset-x-0 mx-auto w-80 sm:w-96 mt-[10vh] bg-white"
          >
            <div className="flex flex-col gap-4 mx-auto">
              <div>Choose your edition</div>
              {console.log(foundEditions)}
                {console.log(foundEditions)}
              <div className="flex justify-between gap-4">
                  { foundEditions ?
                    foundEditions.map((version)=>{
                    return(
                    <button className="text-sm">
                        {/* {console.log("in editions")} */}
                        <img src={version.book_cover.url} alt="" />
                        <div> number of pages</div>
                        <div>{version.page_count}</div>
                        {version.isEbook}
                    </button>)
                  }):console.log("fail")
                //   <div className="flex justify-between gap-4">
                //     {currentBook.versions &&
                //     currentBook.versions.slice(0, 3).map((version)=>{
                //         return(
                //         <button className="text-sm">
                //             <img src={version.book_cover.url} alt="" />
                //             <div> number of pages</div>
                //             <div>{version.page_count}</div>
                //             {version.isEbook}
                //         </button>)
                //       })}
                //   </div>
                  
                }
              </div>
            </div>
            <button
                onClick={(e) => {}
                }
                className="bg-blue-500 shadow-md text-white py-1 mx-auto px-3 rounded-lg"
              >
                None fit your book?
              </button>
            <div className="flex">
              <button
                onClick={() => {setBookAddModal(false)}}
                className="bg-blue-500 shadow-md text-white py-1 mx-auto px-3 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <SearchBar />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-2 gap-x-3 md:w-2/3 w-11/12 mt-10">
          {foundBooks &&
            foundBooks.map((book) => {
            return <div>
               {book &&
                <BookSearchBook book={book} handleModal={(e) => handleModal(e)}/>}
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default FindBooks;
