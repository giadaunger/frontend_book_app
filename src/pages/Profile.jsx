import React, { useEffect, useState } from 'react';
import GetUserStore from '../store/GetUser';
import UpdateUserStore from '../store/UpdateUser';
import { useCookies } from 'react-cookie';

function Profile() {
    const { user, setUser, fetchUser } = GetUserStore();
    const { user_name, setUsername, updateUsername, book_goal, setBookGoal, updateBookGoal, email, setEmail, updateEmail, password, setPassword, updatePassword } = UpdateUserStore()
    const [cookies] = useCookies(["user"]);
    const [editMode, setEditMode] = useState(false);
    const [bookGoalErrMsg, setBookGoalErrMsg] = useState("")
    const [usernameErrMsg, setUsernameErrMsg] = useState("")
    const [gmailErrMsg, setGmailErrMsg] = useState("")

    useEffect(() => {
        const userInfo = fetchUser();
        setUser(userInfo);
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
        setUsername(user.user_name);
        setEmail(user.email);
        setBookGoal(user.book_goal);
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setUsernameErrMsg("")
        const userInfo = fetchUser();
        setUser(userInfo);
    };

    const handleSaveClick = () => {
        setEditMode(false);
    };

    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername)

        if (newUsername.length < 5) {
            setUsernameErrMsg("Password too short, minimum of 5 characters");
        }
        else if (newUsername.length > 100) {
            setUsernameErrMsg("Password too long, maximum of 100 characters")
        }
        else {
            setUsernameErrMsg("");
        }
    }

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail)
    }


    const handleBookGoalChange = (e) => {
        const newBookGoal = e.target.value;
        setBookGoal(newBookGoal)
    }


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
                                    value={user_name}
                                    onChange={handleUsernameChange}
                                    className="sm:p-2 p-1 sm:w-10/12" />
                            </div>
                            {usernameErrMsg && <p className="text-red-500 text-center mb-5">{usernameErrMsg}</p>}
                            <div className="flex flex-col lg:flex-row lg:space-x-2 text-xl mx-auto mb-5">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
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
                                    value={book_goal}
                                    onChange={handleBookGoalChange}
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
