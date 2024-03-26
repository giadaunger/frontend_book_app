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
    const [successMsg, setSuccessMsg] = useState("");
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

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

    const handleBookGoalChange = (e) => {
        const newBookGoal = e.target.value;
        setBookGoal(newBookGoal)
    }

    const handleSaveClick = async (e) => {
        e.preventDefault();
        setShowInput(false);
        setSuccessMsg("You have successfully added a book goal!");
        setShowSuccessMsg(true);
        setTimeout(() => {
            setShowSuccessMsg(false);
        }, 5000);
        try {
            await updateBookGoal(book_goal);
            setUser({ ...user, book_goal: book_goal });
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };


    return (
        <div className="w-4/5 lg:w-2/4 mx-auto bg-[#f8f2e9] p-4 rounded-md shadow-md border">
            <div className="grid lg:grid-cols-2 w-11/12 lg:w-3/4 mx-auto p-4 space-y-5 lg:space-y-0">
                {showSuccessMsg && (
                    <>
                        <p className="text-green-600 p-2">{successMsg}</p>
                        <button
                            className="p-2 text-green-600 items-center"
                            onClick={() => setShowSuccessMsg(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 float-right">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </>
                )}
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
                                        <input
                                            type="number"
                                            placeholder="Enter your book goal"
                                            value={book_goal}
                                            onChange={handleBookGoalChange}
                                            max="5000"
                                            min="0" />
                                        <button
                                            onClick={cancleBookGoal}
                                            className="border border-black rounded-md text-sm p-2 mt-2"
                                        >Cancle</button>
                                        <button
                                            onClick={handleSaveClick}
                                            className="border border-black rounded-md text-sm p-2 mt-2"
                                        >Add book goal</button>
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
                    {(!readBooks || readBooks.length === 0) && user.book_goal !== 0 ? (
                        <div className="w-3/4 mx-auto text-center mt-10 p-4">
                            <p>No books have been read.</p>
                        </div>
                    ) : (
                        <div className="w-3/4 mx-auto text-center mt-10 p-4">
                            {readBooks.map((book, index) => (
                                <div key={index}>
                                    <p>{book.book_version.book.title}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default DashboardStatistics;