import React, { useEffect, useState } from 'react'
import GetUserStore from '../store/GetUser';
import ReadBooksStore from '../store/ReadBooksStore';

function DashboardStatistics() {
    const { user, setUser, fetchUser } = GetUserStore();
    const { readBooks, setReadBooks, fetchReadBooks } = ReadBooksStore();
    const currentYear = new Date().getFullYear()
    const [booksLeft, setBooksLeft] = useState(0);

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
            const booksReadCount = readBooks.length;
            const booksLeftToRead = user.book_goal - booksReadCount;
            setBooksLeft(booksLeftToRead);
        }
    }, [user, readBooks]);

    return (
        <div className="w-4/5 lg:w-2/4 mx-auto bg-[#f8f2e9] p-4 rounded-md shadow-md">
            <div className="grid lg:grid-cols-2 w-11/12 lg:w-3/4 mx-auto p-4 space-y-5 lg:space-y-0">
                {user && (
                    <div className="space-y-5">
                        <h2 className="text-center">{`Your book goal for ${currentYear}:`}</h2>
                        <p className="text-center text-2xl">{user.book_goal}</p>
                    </div>
                )}
                {booksLeft !== null && (
                    <div className="space-y-5">
                        <h2 className="text-center">{`Books left to reach your goal for ${currentYear}:`}</h2>
                        <p className="text-center text-2xl">{booksLeft}</p>
                    </div>
                )}
            </div>
            {readBooks && (
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

export default DashboardStatistics