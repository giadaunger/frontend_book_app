import React, { useEffect, useState } from 'react';
import GetUserStore from '../store/GetUser';
import useStore from '../store/ReadBooksStore';

function DashboardStatistics() {
    const { user, setUser, fetchUser } = GetUserStore();
    const { readBooks, fetchReadBooks, setReadBooks, pagesRead, fetchPagesRead, setPagesRead } = useStore();
    const [loading, setLoading] = useState(true);

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await fetchUser();
                setUser(userInfo);

                const usersReadBooks = await fetchReadBooks();
                console.log(usersReadBooks);
                setReadBooks(usersReadBooks);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-4/5 sm:w-2/4 mx-auto bg-[#f8f2e9] p-4 rounded-md shadow-md border">
            {user && (
                <div>
                    <h2>{`Your book goal for ${currentYear}:`}</h2>
                    <p>{user.book_goal}</p>
                    <p>{`You have read ${readBooks ? readBooks.length : 0} books so far this year`}</p>
                    <div>
                        <h3>Books You've Read:</h3>
                        <ul>
                            {readBooks && readBooks.map(book => (
                                <li key={book.id}>{book.book_version.book.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardStatistics;
