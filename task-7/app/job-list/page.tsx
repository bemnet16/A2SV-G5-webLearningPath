"use client";

import { AlertTriangle, ChevronDown, Loader } from "lucide-react";
import Card from "../ui/job-list/card";
import { useGetOpportunitiesQuery } from "../store/services/opportunityApi";
import { poppins } from "@/app/ui/fonts";
import JobCardSkeleton from "../ui/skeletons/jobCardSkeleton";

type JobPosting = {
  id: string;
  logoUrl: string;
  title: string;
  orgName: string;
  opType: string;
  image: string;
  description: string;
  location: string[];
  categories: string[];
};

export default function page() {
  const {
    data: job_postings,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetOpportunitiesQuery(undefined);

  let errorComponent;

  if (isError) {
    const { status, data, error: err }: any = error;
    errorComponent = (
      <div className="text-[#25324B] p-6 flex flex-col  items-center justify-center text-[17px]">
        <div className="flex flex-col items-center justify-center gap-4">
          <AlertTriangle className="text-red-500 w-16 h-16" />
          <div className="bg-red-100 text-red-700 rounded-md p-4 min-w-96 text-center">
            {status == 500 ? (
              <div>
                <p>500: server error</p>
                <p>{data.message}</p>
              </div>
            ) : (
              <div>
                <p>{status} </p>
                <p>{err}</p>
                <p>Check your connection</p>
              </div>
            )}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:w-2/3">
      <div className="flex flex-col gap-1 pl-3 mb-7">
        <h2
          className={`${poppins.className} text-4xl text-slate-800 font-[900] ml-2`}
        >
          Opportunities
        </h2>
        <p className=" text-gray-400 m-1 ml-3">Showing 73 results</p>

        <div className="flex justify-end gap-2">
          <p className="text-gray-400 text-sm">Sort by:</p>
          <span className="text-sm border-r-2 cursor-pointer flex">
            Most relevant
            <ChevronDown className="size-4 h-full items-center ml-1" />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-7 lg:ml-3">
        {isLoading && <JobCardSkeleton />}
        {isError && errorComponent}
        {isSuccess &&
          job_postings &&
          job_postings.data.map((job_posting: JobPosting, index: number) => {
            const {
              title,
              orgName,
              logoUrl,
              description,
              location: locations,
              categories,
              id,
              opType,
            } = job_posting;
            const job_post = {
              title,
              logoUrl,
              orgName,
              opType,
              description,
              locations,
              categories,
              id,
            };

            return <Card key={index} job_post={job_post} />;
          })}
      </div>
    </div>
  );
}
