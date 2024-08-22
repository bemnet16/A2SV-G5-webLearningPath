"use client";

import React from "react";
import { redirect, useParams } from "next/navigation";
import {
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

import { useSession } from "next-auth/react";
import ErrorComponent from "@/app/components/errorComponent";

const page = () => {
  const session = useSession();

  if (!session.data) {
    redirect("/signin");
  }

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
    return <ErrorComponent Errors={{ status, data, error: err }} />;
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
            <p className="list-disc pl-6">{idealCandidate}</p>
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
