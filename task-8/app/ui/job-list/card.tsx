"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Dot } from "lucide-react";

interface CardProps {
  job_post: {
    id: string;
    title: string;
    orgName: string;
    opType: string;
    logoUrl: string;
    description: string;
    locations: string[];
    categories: string[];
  };
}

const Card = (job_post: CardProps) => {
  const {
    title,
    orgName,
    opType,
    description,
    locations,
    logoUrl,
    categories,
    id,
  } = job_post.job_post;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 lg:px-12 border-2 border-gray-400/25 rounded-[2rem]">
      <Image
        src={logoUrl || ""}
        alt="logo img"
        width={70}
        height={70}
        className="h-12"
      />

      <div className="flex flex-col gap-2">
        <div className="relative">
          <Link href={`/job-list/${id}`}>
            <h3 className="text-xl text-slate-800 font-[600] hover:underline cursor-pointer">
              {title}
            </h3>
          </Link>
          <p className="text-[#7C8493] text-[16px] flex">
            <span>{orgName}</span>
            <Dot className="" />
            <span className="flex gap-1">
              <span>{`${locations[0]}${
                !!locations[1] ? `, ${locations[1]}` : ""
              }`}</span>
            </span>
          </p>
        </div>

        <p className="text-[#25324B] text-lg font-[400] text-justify">
          {description}
        </p>
        <div className="flex items-center mt-4">
          <span className=" text-sm rounded-full text-[#56CDAD] bg-green-50 font-semibold py-1 px-3">
            {opType}
          </span>
          <hr className="rotate-90 bg-gray-400 h-[1px] w-7 m-0 p-0" />
          {categories[0] && (
            <span className=" text-sm text-orange-400 border border-orange-400 font-semibold rounded-full py-1 px-3 mr-2">
              {categories[0]}
            </span>
          )}
          {categories[1] && (
            <span className=" text-sm text-center text-indigo-800 border border-blue-800 font-semibold rounded-full min-w-14 py-1 px-3">
              {categories[1]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
