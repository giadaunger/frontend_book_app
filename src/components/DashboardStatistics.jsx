import React, { useEffect, useState } from 'react';
import GetUserStore from '../store/GetUser';
import ReadBooksStore from '../store/ReadBooksStore';
import UpdateUserStore from '../store/UpdateUser';

function DashboardStatistics() {
    const { user, setUser, fetchUser } = GetUserStore();
    const { readBooks, setReadBooks, fetchReadBooks } = ReadBooksStore();
    const { book_goal, setBookGoal, updateBookGoal } = UpdateUserStore();
    const currentYear = new Date().getFullYear();
    const [booksLeft, setBooksLeft] = useState(null);
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchReadBooks();
                if (res != null) {
                    console.log("Success");
                } else {
                    console.log("Fail: No books fetched or empty array received");
                }
            } catch (error) {
                console.error("Error fetching books:", error);
                console.log("Fail: Error fetching books");
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchUser();
                if (res != null) {
                    console.log("Success");
                } else {
                    console.log("Fail: No books fetched or empty array received");
                }
            } catch (error) {
                console.error("Error fetching books:", error);
                console.log("Fail: Error fetching books");
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (user && readBooks) {
            let booksLeftToRead;
            if (user.book_goal !== undefined && user.book_goal !== null) {
                const booksReadCount = readBooks.length;
                booksLeftToRead = user.book_goal - booksReadCount;
                booksLeftToRead = Math.max(0, booksLeftToRead);
            } else {
                booksLeftToRead = null;
            }
            setBooksLeft(booksLeftToRead);
        }
    }, [user, readBooks]);

    useEffect(() => {
        fetchReadBooks();
    }, [readBooks]);

    const addBookGoal = () => {
        setShowInput(true);
    };

    const cancleBookGoal = () => {
        setShowInput(false);
    };

    return (
        <div className="w-4/5 lg:w-2/4 mx-auto bg-[#f8f2e9] p-4 rounded-md shadow-md border">
            <div className="grid lg:grid-cols-2 w-11/12 lg:w-3/4 mx-auto p-4 space-y-5 lg:space-y-0">
                {user && (
                    <div className="space-y-5">
                        <h2 className="text-center">{`Your book goal for ${currentYear}:`}</h2>
                        {user.book_goal ? (
                            <p className="text-center text-2xl">{user.book_goal}</p>
                        ) : (
                            <div className="text-center">
                                <p>No goal set</p>
                                {showInput ? (
                                    <form>
                                        <input type="text" placeholder="Enter your book goal" />
                                        <button onClick={cancleBookGoal} className="border border-black rounded-md text-sm p-2 mt-2">Cancle</button>
                                        <button onClick={saveBookGoal} className="border border-black rounded-md text-sm p-2 mt-2">Add book goal</button>
                                    </form>
                                ) : (
                                    <button onClick={addBookGoal} className="border border-black rounded-md text-sm p-2 mt-2">Set a book goal</button>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {booksLeft !== null && user.book_goal !== 0 && (
                    <div className="space-y-5">
                        <h2 className="text-center">{`Books left to reach your goal for ${currentYear}:`}</h2>
                        <p className="text-center text-2xl">{booksLeft}</p>
                    </div>
                )}
            </div>
            {readBooks && user.book_goal !== 0 && (
                <div className="w-3/4 mx-auto text-center mt-10 p-4">
                    <h2>{`Books you have read ${currentYear}`}</h2>
                    {readBooks.map((book, index) => (
                        <div key={index}>
                            <p>{book.book_version.book.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DashboardStatistics;
