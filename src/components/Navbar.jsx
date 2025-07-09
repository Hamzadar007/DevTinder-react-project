import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {}
  };

  return (
    <div className="navbar bg-base-200 shadow-lg">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl"
          onClick={() => {
            navigate("/");
          }}
        >
          DevTinder
        </a>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-5">
            <div className="flex items-center gap-3">
              <p>Welcome {user.firstName}</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={user.avatar} />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/connections");
                  }}
                >
                  Connections
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/requests");
                  }}
                >
                  Requests
                </a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
