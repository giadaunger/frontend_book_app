import ProgressBar from '@ramonak/react-progress-bar';
import React from 'react'

function ReadingBookBig(book) {
  return (
    <div className="flex flex-col items-center">
    <div className="flex flex-col lg:flex-row mx-auto gap-4 min-w-[60vw]">
      {readingBooks.slice(0, 3).map((book) => {
        return (
          <div className="bg-[#f8f2e9] mx-auto min-w-72 shadow-lg flex p-6 gap-10 rounded-lg">
            <div>
              {console.log(
                Math.floor(
                  book.pages_read / book.book_version.page_count
                )
              )}
              <ProgressBar
                completed={Math.floor(
                  (book.pages_read / book.book_version.page_count) * 100
                )}
                height="150px"
                borderRadius="10px"
                bgColor={
                  book.book_version.book.main_category.color_code
                }
                baseBgColor="#d1c7b8"
                className="w-20 border-white border-4 rounded-xl"
              />
            </div>
            <div className="">
              <div>{book.book_version.book.title}</div>
              {console.log(
                book.book_version.book.main_category.color_code
              )}
              <div className="">
                {book.pages_read} / {book.book_version.page_count} pages
              </div>
              <div>
                {Math.floor(
                  (book.pages_read / book.book_version.page_count) * 100
                )}
                % done
              </div>
              <button
                onClick={() => {
                  setBookPage(book.pages_read),
                    setPageModal(true),
                    setCurrentBook(book);
                }}
                className="bg-[#ffffff] py-2 px-3 rounded-lg mt-2 shadow-md"
              >
                update page count
              </button>
            </div>
          </div>
        );
      })}
    </div>
    <NavLink>
      <button className="mt-4 py-1 px-2 rounded-lg bg-[#f8f2e9] shadow-md">
        See more
      </button>
    </NavLink>
  </div>
  )
}

export default ReadingBookBig