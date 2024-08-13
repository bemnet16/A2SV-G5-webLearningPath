import { configureStore } from "@reduxjs/toolkit";

import { opportunityApi } from "./services/opportunityApi";

export const store = configureStore({
  reducer: {
    [opportunityApi.reducerPath]: opportunityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(opportunityApi.middleware),
});
