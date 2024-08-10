import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Dot } from "lucide-react";

interface CardProps {
  job_post: {
    id: number;
    title: string;
    company: string;
    image: string;
    description: string;
    location: string;
    categories: string[];
  };
}

const Card = (job_post: CardProps) => {
  const { title, company, description, location, image, categories, id } =
    job_post.job_post;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 lg:px-12 border-2 border-gray-400/25 rounded-[2rem]">
      <Image
        src={`/${image}`}
        alt="Job image"
        width={70}
        height={70}
        className="h-12"
      />

      <div className="flex flex-col gap-2">
        <div>
          <Link href={`/job-list/${id}`}>
            <h3 className="text-2xl text-slate-800 font-bold hover:underline cursor-pointer">
              {title}
            </h3>
          </Link>
          <p className="text-gray-400 flex">
            <span>{company}</span>
            <Dot className="" />
            <span>{location}</span>
          </p>
        </div>

        <p className="text-slate-700 text-xl font text-justify">
          {description}
        </p>
        <div className="flex gap-2 mt-4">
          <span className=" text-sm rounded-full text-green-400 bg-green-100 font-semibold py-1 px-3">
            In Person
          </span>
          <span className=" text-sm text-orange-400 border border-orange-400 font-semibold rounded-full py-1 px-3">
            {categories[0]}
          </span>
          <span className=" text-sm text-center text-indigo-800 border border-blue-800 font-semibold rounded-full min-w-14 py-1 px-3">
            {categories[1]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
