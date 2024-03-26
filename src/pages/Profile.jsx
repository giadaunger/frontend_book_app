import React, { useEffect, useState } from 'react';
import GetUserStore from '../store/GetUser';
import UpdateUserStore from '../store/UpdateUser';
import { Link } from 'react-router-dom';

function Profile() {
    const { user, setUser, fetchUser, fetchUserWithEmail, fetchUserWithUsername } = GetUserStore();
    const { user_name, setUsername, book_goal, setBookGoal, email, setEmail, updateUser } = UpdateUserStore()
    const [editMode, setEditMode] = useState(false);
    const [usernameErrMsg, setUsernameErrMsg] = useState("");
    const [emailErrMsg, setEmailErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

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

    const handleSaveClick = async (e) => {
        e.preventDefault();
        setEditMode(false);
        const updatedUserInfo = {
            user_name,
            book_goal,
            email
        };

        try {
            const userInfo = await updateUser(updatedUserInfo);
            setUser(userInfo);
            setSuccessMsg("You have successfully edited your profile!")
            setShowSuccessMsg(true);
            setTimeout(() => {
                setShowSuccessMsg(false);
            }, 5000);
        } catch (error) {
            console.error("Error updating user:", error);
        }
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
            const checkIfUsernameExists = fetchUserWithUsername(newUsername)
            if (checkIfUsernameExists) {
                setUsernameErrMsg("Username is already in use")
            } else {
                setUsernameErrMsg("");
            }
        }
    }

    const handleEmailChange = async (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(newEmail)) {
            setEmailErrMsg("Invalid email format");
        } else {
            const checkIfEmailExists = await fetchUserWithEmail(newEmail);
            if (checkIfEmailExists) {
                setEmailErrMsg("Email is already in use");
            } else {
                setEmailErrMsg("");
            }
        }
    };

    const handleBookGoalChange = (e) => {
        const newBookGoal = e.target.value;
        setBookGoal(newBookGoal)
    }

    const isSaveDisabled = () => {
        return usernameErrMsg || emailErrMsg;
    };

    return (
        <div>
            <div className="bg-green-200 w-3/4 sm:w-2/4 mx-auto rounded-md shadow-md mb-5 flex justify-between items-center">
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
            </div>
            <div className="w-3/4 sm:w-2/4 mx-auto bg-[#f8f2e9] p-4 rounded-md shadow-md border">
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
                                {emailErrMsg && <p className="text-red-500 text-center mb-5">{emailErrMsg}</p>}
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
                                <div className="flex justify-center mx-auto space-x-5 text-center mt-16">
                                    <button
                                        onClick={handleSaveClick}
                                        disabled={isSaveDisabled()}
                                        className={`border p-2 rounded shadow-md transition duration-300 hover:scale-125 ${isSaveDisabled() ? 'text-gray-500 pointer-events-none' : 'border-black'}`}>                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelClick}
                                        className="border border-black rounded p-2 shadow-md transition duration-300 hover:scale-125">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className=" sm:w-4/5 mx-auto w-full">
                                <h2 className="text-center text-2xl mb-10 p-2">Edit profile</h2>
                                <div className="sm:flex sm:space-x-2 text-xl mx-auto mb-5 bg-[#dcf4d8] p-2 rounded-md overflow-scroll border border-[#7ad56a]">
                                    <h3 className="">Username:</h3>
                                    <p className="">{user.user_name}</p>
                                </div>
                                <div className="sm:flex sm:space-x-2 text-xl mt-5 bg-[#f5dece] p-2 rounded-md overflow-scroll border border-[#e8a372]">
                                    <h3 className="">Email:</h3>
                                    <p>{user.email}</p>
                                </div>
                                <div className="flex space-x-2 text-xl mt-5 bg-[#ccebf5] p-2 rounded-md overflow-scroll border border-[#71bfd9]">
                                    <h3 className="">Book goal:</h3>
                                    <p>{user.book_goal}</p>
                                </div>
                                <div className="flex justify-center mx-auto space-x-5 text-center mt-16">
                                    <button
                                        onClick={handleEditClick}
                                        className="border border-black rounded p-2 shadow-md transition duration-300 hover:scale-125 hover:bg-[#bde1ed] hover:border-[#71bfd9]">
                                        Edit profile
                                    </button>
                                    <Link to="/update-password">
                                        <button className="border border-black p-2 rounded shadow-md transition duration-300 hover:scale-125 hover:bg-[#f2d2ba] hover:border-[#e8a372]">Change password</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

}

export default Profile;
