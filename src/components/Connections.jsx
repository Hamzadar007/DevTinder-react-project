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
      console.log("response === ", res.data.message);
      dispatch(addConnection(res.data.message));
      //   console.log("response === ", res);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("connections == ", connection);

  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="flex flex-col gap-2 items-center my-10 mb-65">
      <h1 className="text-bold text-2xl">Connections</h1>
      {connection?.map((con) => (
        <FeedCard user={con} fromEditProfile={true} />
      ))}
    </div>
  );
};

export default Connections;
