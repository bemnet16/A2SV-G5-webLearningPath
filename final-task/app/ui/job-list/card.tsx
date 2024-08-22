import Link from "next/link";
import Image from "next/image";
import { Bookmark, BookmarkCheckIcon, Dot, LoaderIcon } from "lucide-react";
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
} from "@/app/store/services/bookmarkApi";
import { CardProps } from "@/app/lib/types";

const Card = ({ job_post, refetch, token, setIsPopUp }: CardProps) => {
  const [createBookmark, { isLoading: createLoading }] =
    useCreateBookmarkMutation();
  const [deleteBookmark, { isLoading: deleteLoading }] =
    useDeleteBookmarkMutation();

  const handleBookmark = async () => {
    if (!token) {
      setIsPopUp(true);
    } else {
      try {
        if (job_post.isBookmarked) {
          const response = await deleteBookmark({
            id: job_post.id,
            token,
          });
          if (response.data) {
            refetch();
          }
        } else {
          const response = await createBookmark({
            id: job_post.id,
            token,
          });
          if (response.data) {
            refetch();
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 lg:px-12 lg:pl-6 border-2 border-gray-400/25 rounded-[2rem] relative">
      <button onClick={handleBookmark} className="absolute top-4 right-6">
        {createLoading || deleteLoading ? (
          <LoaderIcon className="animate-spin" color="darkred" />
        ) : job_post.isBookmarked ? (
          <BookmarkCheckIcon
            className="hover:shadow-md hover:cursor-pointer"
            color="yellowgreen"
          />
        ) : (
          <Bookmark
            className="hover:text-red-50 hover:cursor-pointer hover:bg-red-50"
            color="red"
          />
        )}
      </button>

      <Image
        src={job_post.logoUrl || ""}
        alt="logo img"
        width={70}
        height={70}
        className="h-12"
      />

      <div className="flex flex-col gap-2">
        <div className="relative">
          <Link href={`/job-list/${job_post.id}`}>
            <h3 className="text-xl text-slate-800 font-[600] hover:underline cursor-pointer">
              {job_post.title}
            </h3>
          </Link>
          <p className="text-[#7C8493] text-[16px] flex">
            <span>{job_post.orgName}</span>
            <Dot />
            <span className="flex gap-1">
              <span>{`${job_post.locations[0]}${
                job_post.locations[1] ? `, ${job_post.locations[1]}` : ""
              }`}</span>
            </span>
          </p>
        </div>

        <p className="text-[#25324B] text-lg font-[400] text-justify">
          {job_post.description}
        </p>
        <div className="flex items-center mt-4">
          <span className="text-sm rounded-full text-[#56CDAD] bg-green-50 font-semibold py-1 px-3">
            {job_post.opType}
          </span>
          <hr className="rotate-90 bg-gray-400 h-[1px] w-7 m-0 p-0" />
          {job_post.categories && job_post.categories[0] && (
            <span className="text-sm text-orange-400 border border-orange-400 font-semibold rounded-full py-1 px-3 mr-2">
              {job_post.categories[0]}
            </span>
          )}
          {job_post.categories && job_post.categories[1] && (
            <span className="text-sm text-center text-indigo-800 border border-blue-800 font-semibold rounded-full min-w-14 py-1 px-3">
              {job_post.categories[1]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
