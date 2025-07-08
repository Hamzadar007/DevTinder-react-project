import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionReducer from "./connectionSlice";
import feedReducer from "./feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
  },
});

export default appStore;
