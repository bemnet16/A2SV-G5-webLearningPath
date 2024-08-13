import React from "react";
import { BellDot, CircleCheckBig, MapPinCheck } from "lucide-react";

const JobDetailSkeleton = () => {
  return (
    <div className="text-[#25324B] p-6 flex flex-col sm:flex-row text-[17px] animate-pulse">
      <div className="sm:w-3/4 p-4 flex flex-col gap-8 lg:pr-6">
        <div>
          <h2 className="text-2xl font-extrabold mb-1 bg-gray-300 rounded-md w-1/3 h-6"></h2>
          <p className="bg-gray-200 rounded-md w-full h-4 my-2"></p>
          <p className="bg-gray-200 rounded-md w-5/6 h-4 my-2"></p>
          <p className="bg-gray-200 rounded-md w-3/4 h-4 my-2"></p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold mb-1 bg-gray-300 rounded-md w-1/3 h-6"></h2>
          <div className="flex flex-col gap-2">
            <p className="flex gap-3 py-1">
              <CircleCheckBig className="size-6 text-green-600" />
              <span className="bg-gray-200 rounded-md w-4/5 h-4"></span>
            </p>
            <p className="flex gap-3 py-1">
              <CircleCheckBig className="size-6 text-green-600" />
              <span className="bg-gray-200 rounded-md w-3/4 h-4"></span>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold mb-1 bg-gray-300 rounded-md w-1/3 h-6"></h2>
          <p className="bg-gray-200 rounded-md w-full h-4 my-2"></p>
          <p className="bg-gray-200 rounded-md w-5/6 h-4 my-2"></p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold mb-1 bg-gray-300 rounded-md w-1/3 h-6"></h2>
          <p className="bg-gray-200 rounded-md w-3/4 h-4 my-2"></p>
          <p className="bg-gray-200 rounded-md w-2/3 h-4 my-2"></p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold mb-1 bg-gray-300 rounded-md w-1/3 h-6"></h2>
          <p className="flex items-center">
            <MapPinCheck className="size-6 text-blue-500 mr-1" />
            <span className="bg-gray-200 rounded-md w-1/2 h-4"></span>
          </p>
        </div>
      </div>
      <div className="sm:w-1/4 flex flex-col p-4 gap-8">
        <div>
          <h2 className="text-2xl font-extrabold mb-1 bg-gray-300 rounded-md w-1/3 h-6"></h2>
          <div className="flex flex-col gap-5">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex gap-2 items-center">
                <span className="border rounded-full p-2 bg-gray-200">
                  <BellDot className="size-5 text-cyan-500" />
                </span>
                <div>
                  <p className="bg-gray-200 rounded-md w-1/3 h-4 my-1"></p>
                  <span className="bg-gray-200 rounded-md w-1/2 h-4"></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr />

        <div>
          <h2 className="text-2xl font-extrabold mb-1 bg-gray-300 rounded-md w-1/3 h-6"></h2>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-center text-orange-400  font-semibold rounded-full p-1 bg-gray-200 w-3/4"></p>
            <p className="text-sm text-center text-green-400  font-semibold rounded-full p-1 bg-gray-200 w-2/3"></p>
          </div>
        </div>

        <hr />

        <div>
          <h2 className="text-2xl font-extrabold mb-1 bg-gray-300 rounded-md w-1/3 h-6"></h2>
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, index) => (
              <span
                key={index}
                className="text-sm text-[#4640DE] m-2 p-2 bg-gray-200 w-20 h-4 rounded"
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailSkeleton;
