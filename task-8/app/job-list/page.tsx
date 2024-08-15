"use client";

import { AlertTriangle, ChevronDown, LogOutIcon } from "lucide-react";
import Card from "../ui/job-list/card";
import { useGetOpportunitiesQuery } from "../store/services/opportunityApi";
import { poppins } from "@/app/ui/fonts";
import JobCardSkeleton from "../ui/skeletons/jobCardSkeleton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

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
  const { data: session } = useSession();
  console.log(session?.user);
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
      {session ? (
        <div className="fixed top-2 right-3 flex gap-2 items-center justify-center mr-2">
          {session?.user.image ? (
            <Image
              src={session?.user ? session?.user.image : "/images/job1.jpeg"}
              width={50}
              height={50}
              className="rounded-full"
              alt="profile image"
            />
          ) : (
            <span className="bg-orange-200 border-2 text-green-900 font-bold border-orange-800 flex items-center justify-center p-4 rounded-full w-10 h-10">
              {session?.user.name[0].toUpperCase()}
            </span>
          )}
          <div className="flex flex-col">
            <p className="text-sm text-slate-700">{session?.user.name}</p>
            <p className="text-xs text-slate-500">{session?.user.email}</p>
          </div>
          <Link
            href="/api/auth/signout"
            className="bg-gray-200 p-3 rounded-md hover:bg-gray-300"
          >
            <LogOutIcon className="size-4" />
          </Link>
        </div>
      ) : (
        <div className="fixed top-3 right-3 flex gap-2 items-center justify-center mr-2">
          <Link
            className="bg-orange-300 text-orange-800 hover:bg-orange-200 text-sm font-bold rounded-full py-2 px-4 border-2 border-orange-800"
            href="/signin"
          >
            Log In
          </Link>
          <Link
            className="bg-indigo-300 text-indigo-800 hover:bg-indigo-200 text-sm font-bold rounded-full py-2 px-4 border-2 border-indigo-800"
            href="/signup"
          >
            Register
          </Link>
        </div>
      )}
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
