import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("hamza123@gmail.com");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("Hamza@123");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email: emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      console.log("errpr", error.response.data);

      setErrorMessage(error.response.data.error);
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      setErrorMessage("");
      setIsSignUp(true);

      if (!isSignUp) return;
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          email: emailId,
          password,
          firstName,
          lastName,
          username: userName,
        },
        { withCredentials: true }
      );
      setIsSignUp(false);
    } catch (error) {
      console.log("errpr", error.response.data);

      setErrorMessage(error.response.data.error);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <fieldset className="fieldset  rounded-box w-xs border p-4 border-base-300">
              {isSignUp && (
                <>
                  <label className="label">User Name</label>
                  <input
                    type="text"
                    className="input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
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
                </>
              )}
              <label className="label">Email ID</label>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500 text-center">{errorMessage}</p>
          </div>
          <div className="card-actions justify-center">
            {!isSignUp && (
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            )}
            <button className="btn btn-secondary" onClick={handleSignUp}>
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
