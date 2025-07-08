import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed?page=1&limit=10000", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.message));
    } catch (error) {}
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex flex-col items-center gap-4 flex-1 pb-66">
      {feed && <FeedCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
