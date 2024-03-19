import React, { useEffect, useState } from 'react';
import GetUserStore from '../store/GetUser';
import { useCookies } from 'react-cookie';

function Profile() {
    const { user, setUser, fetchUser } = GetUserStore();
    const [cookies] = useCookies(["user"]);
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState(null); 
    const [bookGoalErrMsg, setBookGoalErrMsg] = useState("")
    const [usernameErrMsg, setUsernameErrMsg] = useState("")
    const [gmailErrMsg, setGmailErrMsg] = useState("")

    useEffect(() => {
        const userInfo = fetchUser();
        setUser(userInfo);
    }, []);

    useEffect(() => {
        if (user) {
            setEditedUser({ ...user });
        }
    }, [user]);

    const handleEditClick = () => {
        setEditMode(true); 
    };

    const handleCancelClick = () => {
        setEditMode(false); 
        setEditedUser({ ...user });
    };

    const handleSaveClick = () => {
        setEditMode(false); 
    };

    const handleChange = (e) => {
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="w-3/4 sm:w-2/4 mx-auto bg-[#f8f2e9] p-4">
            {user && (
                <div>
                    {editMode ? (
                        <form>
                            <div className="flex flex-col lg:flex-row lg:space-x-2 text-xl mx-auto mb-5"> {/* Use flex-col for smaller screens and flex-row for larger screens */}
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    value={editedUser.user_name}
                                    onChange={handleChange}
                                    className="sm:p-2 p-1 sm:w-10/12" />
                            </div>
                            <div className="flex flex-col lg:flex-row lg:space-x-2 text-xl mx-auto mb-5"> {/* Use flex-col for smaller screens and flex-row for larger screens */}
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleChange}
                                    className="sm:p-2 p-1 sm:w-10/12" />
                            </div>
                            <div className="flex flex-col lg:flex-row lg:space-x-2 text-xl mx-auto mb-5"> {/* Use flex-col for smaller screens and flex-row for larger screens */}
                                <label>Book goal</label>
                                <input
                                    type="number"
                                    name="book_goal"
                                    max="5000"
                                    min="0"
                                    value={editedUser.book_goal}
                                    onChange={handleChange}
                                    className="sm:p-2 p-1 sm:w-10/12" />
                            </div>
                            <div className="flex justify-center mx-auto space-x-5 text-center mt-16">
                                <button
                                    onClick={handleSaveClick}
                                    className="border border-black rounded p-2 shadow-md transition duration-300 hover:scale-125">
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelClick}
                                    className="border border-black rounded p-2 shadow-md transition duration-300 hover:scale-125">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="w-1/2 sm:w-4/5 mx-auto">
                            <div className="sm:flex sm:space-x-2 text-xl mx-auto mb-5">
                                <h3 className="">Username:</h3>
                                <p className="">{user.user_name}</p>
                            </div>
                            <div className="sm:flex sm:space-x-2 text-xl mt-5">
                                <h3 className="">Email:</h3>
                                <p>{user.email}</p>
                            </div>
                            <div className="sm:flex sm:space-x-2 text-xl mt-5">
                                <h3 className="">Book goal:</h3>
                                <p>{user.book_goal}</p>
                            </div>
                            <div className="flex justify-center mx-auto space-x-5 text-center mt-16">
                                <button
                                    onClick={handleEditClick}
                                    className="border border-black rounded p-2 shadow-md transition duration-300 hover:scale-125">
                                    Edit profile
                                </button>
                                <button className="border border-black p-2 rounded shadow-md transition duration-300 hover:scale-125">Change password</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}

export default Profile;
