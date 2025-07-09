import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
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

  const sendOrIgnoreUser = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (error) {}
  };

  useEffect(() => {
    getFeed();
  }, []);
  console.log(feed);

  return (
    <div className="flex flex-col items-center gap-4 flex-1 pb-66">
      {!feed ||
        (feed?.length == 0 && (
          <h2 className="flex justify-center mt-10 text-2xl">Feed is empty</h2>
        ))}
      {feed && feed?.length != 0 && (
        <FeedCard user={feed[0]} sendOrIgnoreUser={sendOrIgnoreUser} />
      )}
    </div>
  );
};

export default Feed;
