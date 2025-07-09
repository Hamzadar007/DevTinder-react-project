import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import FeedCard from "./FeedCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((state) => state.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connections?page=1&limit=10",
        {
          withCredentials: true,
        }
      );

      dispatch(addConnection(res.data.message));
      //   console.log("response === ", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="my-10">
      <h1 className="text-2xl ml-4">Connections</h1>
      <div className="lg:flex sm:mb-65">
        {connection?.map((con) => (
          <div
            key={con?._id}
            className="lg:flex m-4 p-4 rounded-lg bg-base-300 lg:flex-1"
          >
            <div>
              <img className="w-20 h-20 rounded-full" src={con?.avatar} />
            </div>
            <div className="ml-2">
              <h2 className="text-3xl text-orange-700">
                {con.firstName + " " + con?.lastName}
              </h2>
              <p>{con?.about}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
