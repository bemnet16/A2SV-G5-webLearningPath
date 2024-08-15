import { configureStore } from "@reduxjs/toolkit";

import { opportunityApi } from "./services/opportunityApi";
import { authApi } from "./services/authApi";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    [opportunityApi.reducerPath]: opportunityApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      opportunityApi.middleware,
      authApi.middleware
    ),
});
