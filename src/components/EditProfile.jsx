import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((state) => state.user);

  if (!user) return null;
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleOptionSelect = (value) => {
    setGender(value);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputBlur = (e) => {
    // Delay closing to allow click on options
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, avatar },
        { withCredentials: true }
      );
      setShowToast(true);
      dispatch(addUser(res.data.data));
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.log(error);

      setError(error.response.data.error);
    }
  };
  return (
    <>
      <div className="pb-65 flex items-center justify-center gap-2">
        <div className="flex justify-center items-center mt-2.5">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <div>
                <fieldset className="fieldset  rounded-box w-xs border p-4 border-base-300">
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label className="label">Photo URL</label>
                  <input
                    type="text"
                    className="input"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                  <label className="label">Age</label>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <label className="label">Gender</label>
                  <div className="dropdown">
                    <input
                      tabIndex={0}
                      type="text"
                      className="input"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      placeholder="Select gender"
                    />
                    {isDropdownOpen && (
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li>
                          <a onClick={() => handleOptionSelect("male")}>Male</a>
                        </li>
                        <li>
                          <a onClick={() => handleOptionSelect("female")}>
                            Female
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                  <label className="label">About</label>

                  <textarea
                    className="textarea"
                    placeholder="Bio"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
                <p className="text-red-500 text-center">{error}</p>
              </div>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        {user && (
          <FeedCard
            user={{ firstName, lastName, age, avatar, about, gender }}
            fromEditProfile={true}
          />
        )}
      </div>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile update successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
