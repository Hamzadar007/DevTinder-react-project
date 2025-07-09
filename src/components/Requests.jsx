import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const user = useSelector((state) => state.user);
  const fetchrequests = async () => {
    try {
      let id = user?._id;
      console.log(id, user, BASE_URL + "/admin/user/requests/" + id);

      const res = await axios.get(
        BASE_URL + "/request/received?page=1&limit=10",
        {
          withCredentials: true,
        }
      );
      console.log("response === ", res.data.message);
      dispatch(addRequests(res.data.message));
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("Requests == ", requests);

  useEffect(() => {
    fetchrequests();
  }, []);
  return (
    <div className="my-10">
      <h1 className="text-2xl ml-4">Connection Requests</h1>
      <div className="flex">
        {requests?.map((con) => (
          <div
            key={con._id}
            className="flex m-4 p-4 rounded-lg bg-base-300 flex-1 items-center"
          >
            <div>
              <img className="w-20 h-20 rounded-full" src={con?.avatar} />
            </div>
            <div className="ml-4 flex flex-col gap-2 flex-1">
              <h2 className="text-3xl text-orange-700">
                {con.firstName + " " + con?.lastName}
              </h2>
              <p>{con?.about}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-primary">Reject</button>
              <button className="btn btn-secondary">Accept</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
