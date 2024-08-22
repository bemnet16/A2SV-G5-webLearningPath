"use client";

import React from "react";
import { poppins } from "@/app/ui/fonts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setBookmarks } from "@/app/store/features/bookmarkSlice";
import { setOpportunities } from "@/app/store/features/opportunitySlice";
import { ScanSearch, Search } from "lucide-react";
import Card from "../../ui/job-list/card";
import JobCardSkeleton from "../../ui/skeletons/jobCardSkeleton";
import { useGetOpportunitiesQuery } from "../../store/services/opportunityApi";
import { useGetBookmarksQuery } from "@/app/store/services/bookmarkApi";
import PopUp from "@/app/components/popUpCard";
import { JobPosting } from "@/app/lib/types";
import ErrorComponent from "@/app/components/errorComponent";

export default function Page() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const bookmarks = useSelector(
    (state: { bookmarks: { bookmarks: string[] } }) => state.bookmarks.bookmarks
  );
  const opportunities = useSelector(
    (state: { opportunities: { opportunities: JobPosting[] } }) =>
      state.opportunities.opportunities
  );

  const {
    data: job_postings,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetOpportunitiesQuery(undefined);

  const {
    data: resData,
    isSuccess: isBookmarksSuccess,
    refetch,
  } = useGetBookmarksQuery(session?.user.accessToken, {
    skip: !session?.user.accessToken,
  });

  useEffect(() => {
    if (isSuccess && job_postings) {
      dispatch(setOpportunities(job_postings.data));
    }
  }, [isSuccess, job_postings, dispatch]);

  useEffect(() => {
    if (isBookmarksSuccess && resData) {
      dispatch(
        setBookmarks(
          resData.data.map((bookmark: { eventID: string }) => bookmark.eventID)
        )
      );
    }
  }, [isBookmarksSuccess, resData, dispatch]);

  const filteredOpportunities = opportunities
    ? opportunities.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="p-6 lg:w-2/3">
      {isPopUp && <PopUp setIsPopUp={setIsPopUp} />}
      <div className="flex flex-col gap-1 pl-3 mb-7">
        <h2
          className={`${poppins.className} text-4xl heyit text-slate-800 font-[900] ml-2`}
        >
          Opportunities
        </h2>

        <div className="flex justify-end items-center gap-2">
          <div className="flex flex-col items-end gap-1 relative">
            <Search className="absolute top-2 right-1 text-slate-500 w-6 h-5" />
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-1 rounded-md outline-none focus:border-slate-400 text-slate-600 focus:ring-0"
            />
            <p className="text-gray-600 text-sm ml-3">
              Showing {filteredOpportunities.length} results
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-7 lg:ml-3">
        {isLoading && <JobCardSkeleton />}
        {isError && <ErrorComponent Errors={error} />}
        {isSuccess && filteredOpportunities.length === 0 && (
          <div className="text-[#25324B] p-6 flex flex-col items-center justify-center text-[17px]">
            <div className="flex flex-col items-center justify-center gap-4">
              <ScanSearch className="text-yellow-500 w-16 h-16" />
              <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 font-semibold rounded-md p-4 min-w-96 text-center">
                <p>No results found</p>
              </div>
            </div>
          </div>
        )}
        {isSuccess &&
          filteredOpportunities.length >= 1 &&
          filteredOpportunities.map(
            (job_posting: JobPosting, index: number) => {
              const job_post = {
                ...job_posting,
                locations: job_posting.location,
                isBookmarked: bookmarks?.includes(job_posting.id),
                token: session?.user.accessToken || "",
              };

              return (
                <div key={index} className="card">
                  <Card
                    job_post={job_post}
                    refetch={refetch}
                    setIsPopUp={setIsPopUp}
                    token={session?.user.accessToken || ""}
                  />
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}
