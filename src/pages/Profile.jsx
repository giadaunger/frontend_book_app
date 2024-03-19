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
        setUsernameErrMsg("")
    };

    const handleSaveClick = () => {
        setEditMode(false);
    };

    const handleUpdateUser = (e) => {
        const { name, value } = e.target;

        if (name === "user_name") {
            if (value.length < 5 || value.length > 320) {
                setUsernameErrMsg("Username must be between 5 and 320 characters.");
            } else {
                setUsernameErrMsg("");
            }
        } else if (name === "email") {
            if (!validateEmail(value)) {
                setGmailErrMsg("Invalid email address.");
            } else {
                setGmailErrMsg("");
            }
        } else if (name == "book_goal") {
            if (value < 0 || value > 5000) {
                setBookGoalErrMsg("A bok goal has to be between 0 and 5000 books / year")
            } else {
                setBookGoalErrMsg("")
            }
        }

        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    return (
        <div className="w-3/4 sm:w-2/4 mx-auto bg-[#f8f2e9] p-4 rounded-md shadow-md">
            {user && (
                <div>
                    {editMode ? (
                        <form>
                            <div className="flex flex-col lg:flex-row lg:space-x-2 text-xl mx-auto mb-5">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    value={editedUser.user_name}
                                    onChange={handleUpdateUser}
                                    className="sm:p-2 p-1 sm:w-10/12" />
                            </div>
                            {usernameErrMsg && <p className="text-red-500 text-center mb-5">{usernameErrMsg}</p>}
                            <div className="flex flex-col lg:flex-row lg:space-x-2 text-xl mx-auto mb-5">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleUpdateUser}
                                    className="sm:p-2 p-1 sm:w-10/12" />
                            </div>
                            {gmailErrMsg && <p className="text-red-500 text-center mb-5">{gmailErrMsg}</p>}
                            <div className="flex flex-col lg:flex-row lg:space-x-2 text-xl mx-auto mb-5">
                                <label>Book goal</label>
                                <input
                                    type="number"
                                    name="book_goal"
                                    max="5000"
                                    min="0"
                                    value={editedUser.book_goal}
                                    onChange={handleUpdateUser}
                                    className="sm:p-2 p-1 sm:w-10/12" />
                            </div>
                            {bookGoalErrMsg && <p className="text-red-500 text-center mb-5">{bookGoalErrMsg}</p>}
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
