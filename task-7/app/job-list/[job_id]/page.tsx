"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  AlertTriangle,
  BellDot,
  CalendarCheck,
  CalendarPlus2,
  CircleCheckBig,
  MapPin,
  MapPinCheck,
} from "lucide-react";
import AboutCard from "@/app/ui/description/aboutCard";
import { useGetOpportunityByIdQuery } from "@/app/store/services/opportunityApi";
import JobDetailSkeleton from "@/app/ui/skeletons/jobDetailSkeleton";

const page = () => {
  const { job_id } = useParams<{ job_id: string }>();
  const {
    data: job_post,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetOpportunityByIdQuery(job_id, { skip: !job_id });

  if (isLoading) {
    return <JobDetailSkeleton />;
  }

  if (isError) {
    const { status, data, error: err }: any = error;
    return (
      <div className="text-[#25324B] p-6 flex flex-col h-screen items-center justify-center text-[17px]">
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

  if (job_post && isSuccess) {
    const {
      description,
      responsibilities,
      whenAndWhere,
      requirements,
      categories,
      startDate,
      endDate,
      deadline,
      location,
      requiredSkills,
      idealCandidate,
    } = job_post.data;

    const aboutsInfo = [
      { title: "Deadline", value: deadline, icon: BellDot },
      { title: "Location", value: location, icon: MapPin },
      { title: "Start Date", value: startDate, icon: CalendarPlus2 },
      { title: "End Date", value: endDate, icon: CalendarCheck },
    ];

    return (
      <div className="text-[#25324B] p-6 flex flex-col sm:flex-row text-[17px]">
        <div className="sm:w-3/4 p-4 flex flex-col gap-8 lg:pr-6">
          <div>
            <h2 className="text-2xl font-extrabold mb-1">Description</h2>
            <p className="text-[17px]">{description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold mb-1">Responsibilities</h2>
            {responsibilities
              .split("\n")
              .map((responsibility: string, index: number) => (
                <p key={index} className="flex gap-3 py-1 text-[17px]">
                  <CircleCheckBig className="size-6 text-green-600" />
                  {responsibility}
                </p>
              ))}
          </div>

          <div>
            <h2 className="text-2xl font-extrabold mb-1">Requirements</h2>
            <p className="list-disc pl-6">{requirements}</p>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold mb-1">
              Ideal Candidate we want
            </h2>
            <p className="list-disc pl-6">
              {idealCandidate}
              {/* {traits.map((trait: string, index: number) => {
              const [main, desc] = trait.split(":");
              return (
                <li className="text-[17px]" key={index}>
                  <span className="font-bold">{main}</span>
                  <span>
                    {desc ? `:` : "."} {desc}
                  </span>
                </li>
              );
            })} */}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold mb-1">When & Where</h2>
            <p>
              <MapPinCheck className="size-6 text-blue-500 mr-1 inline text-[17px]" />
              {whenAndWhere}
            </p>
          </div>
        </div>
        <div className="sm:w-1/4 flex flex-col p-4 gap-8">
          <div>
            <h2 className="text-2xl font-extrabold mb-1">About</h2>
            <div className="flex flex-col gap-5">
              {aboutsInfo.map((about, index) => (
                <AboutCard
                  key={index}
                  title={about.title}
                  value={about.value}
                  icon={about.icon}
                />
              ))}
            </div>
          </div>

          <hr />

          <div>
            <h2 className="text-2xl font-extrabold mb-1">Categories</h2>
            <div className="flex flex-col gap-3">
              <p className=" text-sm text-center text-orange-400 bg-orange-50 font-semibold rounded-full p-1">
                {categories[0]}
              </p>
              {categories[1] && (
                <p className=" text-sm text-center text-green-400 bg-green-50 font-semibold rounded-full p-1">
                  {categories[1]}
                </p>
              )}
            </div>
          </div>

          <hr />

          <div>
            <h2 className="text-2xl font-extrabold mb-1">Required Skills</h2>
            {requiredSkills.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-[#F8F8FD] text-sm text-[#4640DE] m-2 p-2 block"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default page;
