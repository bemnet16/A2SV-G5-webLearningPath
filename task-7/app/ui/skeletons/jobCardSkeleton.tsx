import React from "react";
import { Dot } from "lucide-react";

const JobCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row gap-4 p-6 lg:px-12 border-2 border-gray-400/25 rounded-[2rem]"
        >
          <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>

          <div className="flex flex-col gap-2 w-full">
            <div className="relative">
              <div className="h-6 bg-gray-200 rounded-md w-3/4 animate-pulse mb-2"></div>
              <p className="flex items-center space-x-2">
                <span className="h-4 w-1/3 bg-gray-200 rounded-md animate-pulse"></span>
                <Dot className="text-gray-400" />
                <span className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse"></span>
              </p>
            </div>

            <p className="text-justify space-y-2">
              <span className="block h-4 bg-gray-200 rounded-md animate-pulse w-full"></span>
              <span className="block h-4 bg-gray-200 rounded-md animate-pulse w-5/6"></span>
              <span className="block h-4 bg-gray-200 rounded-md animate-pulse w-2/3"></span>
            </p>

            <div className="flex items-center mt-4 space-x-4">
              <span className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></span>
              <hr className="rotate-90 bg-gray-400 h-[1px] w-7 m-0 p-0" />
              <span className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></span>
              <span className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobCardSkeleton;
