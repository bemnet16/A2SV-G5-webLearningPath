import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import nodeFetch from "node-fetch";

const fetchFn = (typeof window === "undefined"
  ? nodeFetch
  : fetch) as unknown as (
  input: RequestInfo,
  init?: RequestInit
) => Promise<Response>;

const baseQuery = fetchBaseQuery({
  baseUrl: "https://akil-backend.onrender.com/",
  fetchFn,
});
export const BookmarkApi = createApi({
  reducerPath: "bookmarkApi",
  baseQuery,
  endpoints: (builer) => ({
    getBookmarks: builer.query({
      query: (token) => ({
        url: "bookmarks",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    createBookmark: builer.mutation({
      query: ({ id, token }) => ({
        url: `bookmarks/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      }),
    }),
    deleteBookmark: builer.mutation({
      query: ({ id, token }) => ({
        url: `bookmarks/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
} = BookmarkApi;
export default BookmarkApi;
