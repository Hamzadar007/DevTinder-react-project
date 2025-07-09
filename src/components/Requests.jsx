import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const user = useSelector((state) => state.user);
  const [isRequestAccepted, setIsRequestAccepted] = useState(false);
  const [isRequestRejected, setIsRequestRejected] = useState(false);
  const fetchrequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/request/received?page=1&limit=10",
        {
          withCredentials: true,
        }
      );

      dispatch(addRequests(res.data.message));
    } catch (error) {
      console.log("error", error);
    }
  };

  const requestAcceptOrReject = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      if (res) {
        if (status === "accepted") {
          setIsRequestAccepted(true);
          setTimeout(() => {
            setIsRequestAccepted(false);
          }, 1000);
        } else {
          setIsRequestRejected(true);
          setTimeout(() => {
            setIsRequestRejected(false);
          }, 1000);
        }
        let filteredRequests = requests.filter((req) => req._id != id);
        dispatch(addRequests(filteredRequests));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchrequests();
  }, []);

  return (
    <div className="my-10">
      <h1 className="text-2xl ml-4">Connection Requests</h1>
      {!requests ||
        (requests?.length === 0 && (
          <h2 className="flex justify-center mt-10 text-2xl">
            No connection requests
          </h2>
        ))}
      <div className="flex">
        {requests?.map((req) => (
          <div
            key={req._id}
            className="flex m-4 p-4 rounded-lg bg-base-300 flex-1 items-center"
          >
            <div>
              <img
                className="w-20 h-20 rounded-full"
                src={req?.fromUserId?.avatar}
              />
            </div>
            <div className="ml-4 flex flex-col gap-2 flex-1">
              <h2 className="text-3xl text-orange-700">
                {req?.fromUserId?.firstName + " " + req?.fromUserId?.lastName}
              </h2>
              <p>{req?.fromUserId?.about}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => requestAcceptOrReject("rejected", req._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => requestAcceptOrReject("accepted", req._id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}

        {isRequestRejected && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-error">
              <span>Requests rejected</span>
            </div>
          </div>
        )}
        {isRequestAccepted && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Request accept successfully.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
