"use client";

import ErrorComponent from "@/app/components/errorComponent";
import { useGetBookmarksQuery } from "@/app/store/services/bookmarkApi";
import BookmarkCard from "@/app/ui/bookmarks/bookmarkCard";
import BookmarksSkeleton from "@/app/ui/skeletons/bookmarksSkeleton";
import { BookMarked } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { BookmarkCardProps } from "@/app/lib/types";

const BookMarksPage = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/signin");
  }

  const {
    isError,
    data: resData,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetBookmarksQuery(session?.user.accessToken);

  const bookmarks = resData?.data;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-slate-700 ml-3">
        Your Bookmark List
      </h1>
      {isLoading && <BookmarksSkeleton />}
      {isError && <ErrorComponent Errors={error} />}
      {isSuccess && bookmarks && bookmarks.length === 0 && (
        <div className="text-[#25324B] p-6 flex flex-col items-start mt-20 ml-24 justify-center text-[17px]">
          <div className="flex flex-col items-center justify-center gap-4">
            <BookMarked className="text-yellow-500 w-16 h-16" />
            <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 font-semibold rounded-md p-4 min-w-96 text-center">
              <p>No bookmarked opportunities found!</p>
            </div>
          </div>
        </div>
      )}
      {isSuccess && bookmarks && bookmarks.length > 0 && (
        <div>
          {bookmarks.map((bookmark: BookmarkCardProps, idx: number) => {
            return (
              <BookmarkCard
                key={idx}
                bookmark={bookmark}
                token={session?.user.accessToken || ""}
                refetch={refetch}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookMarksPage;
