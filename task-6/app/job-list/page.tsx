import { ChevronDown } from "lucide-react";
import Card from "../ui/job-list/card";

const dummyData = require("../lib/dummyData.json");

type JobPosting = {
  title: string;
  company: string;
  image: string;
  description: string;
  about: {
    location: string;
    categories: string[];
  };
};

export default function page() {
  const job_postings = dummyData.job_postings;
  return (
    <div className="p-6 lg:w-2/3">
      <div className="flex flex-col gap-1 pl-3 mb-7">
        <h2 className="text-4xl text-slate-800 font-extrabold ml-2">
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
        {job_postings.map((job_posting: JobPosting, index: number) => {
          const {
            title,
            company,
            image,
            description,
            about: { location, categories },
          } = job_posting;
          const job_post = {
            title,
            image,
            company,
            description,
            location,
            categories,
            id: index,
          };

          return <Card key={index} job_post={job_post} />;
        })}
      </div>
    </div>
  );
}
