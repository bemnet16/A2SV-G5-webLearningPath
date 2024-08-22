import { configureStore } from "@reduxjs/toolkit";

import { opportunityApi } from "./services/opportunityApi";
import { authApi } from "./services/authApi";
import { BookmarkApi } from "./services/bookmarkApi";
import userReducer from "./features/userSlice";
import bookmarkReducer from "./features/bookmarkSlice";
import opportunityReducer from "./features/opportunitySlice";

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    bookmarks: bookmarkReducer,
    opportunities: opportunityReducer,
    [opportunityApi.reducerPath]: opportunityApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [BookmarkApi.reducerPath]: BookmarkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      opportunityApi.middleware,
      authApi.middleware,
      BookmarkApi.middleware
    ),
});
