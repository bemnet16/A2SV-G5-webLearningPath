"use client";

import { Dot, LoaderIcon, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeleteBookmarkMutation } from "@/app/store/services/bookmarkApi";
import { useDispatch } from "react-redux";
import { removeBookmark } from "@/app/store/features/bookmarkSlice";

interface BookmarkCardProps {
  bookmark: {
    title: string;
    orgName: string;
    opType: string;
    location: string;
    logoUrl: string;
    eventID: string;
    datePosted: string;
    dateBookmarked: string;
  };
  token: string;
  refetch: () => void;
}

const BookmarkCard = ({ bookmark, token, refetch }: BookmarkCardProps) => {
  const [deleteBookmark, { isLoading }] = useDeleteBookmarkMutation();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    const response = await deleteBookmark({ id: bookmark.eventID, token });
    if (!response.error) {
      dispatch(removeBookmark(bookmark.eventID));
      refetch();
    } else {
      console.error("Failed to delete bookmark:", response.error);
    }
  };

  return (
    <div className="w-2/3 flex flex-col sm:flex-row gap-4 p-6 lg:px-12 lg:pl-6 border-2 border-gray-400/25 rounded-lg relative m-5 ml-0">
      <div className="absolute top-0 right-6 h-full flex items-center">
        <button onClick={handleDelete}>
          {isLoading ? (
            <LoaderIcon className="animate-spin" color="darkred" />
          ) : (
            <Trash
              className="hover:text-red-50 hover:cursor-pointer hover:bg-red-50"
              color="darkred"
            />
          )}
        </button>
      </div>

      <Image
        src={bookmark.logoUrl ? bookmark.logoUrl : ""}
        alt="logo img"
        width={70}
        height={70}
        className="h-12"
      />

      <div className="flex flex-col gap-2">
        <div className="relative">
          <Link href={`/job-list/${bookmark.eventID}`}>
            <h3 className="text-xl text-slate-800 font-[600] hover:underline cursor-pointer">
              {bookmark.title}
            </h3>
          </Link>
          <p className="text-[#7C8493] text-[16px] flex">
            <span>{bookmark.orgName}</span>
            <Dot className="" />
            <span className="flex gap-1">{bookmark.location}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
