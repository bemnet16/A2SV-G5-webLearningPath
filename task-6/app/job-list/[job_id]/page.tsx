"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  BellDot,
  CalendarCheck,
  CalendarPlus2,
  CircleCheckBig,
  CircleFadingPlus,
  MapPin,
  MapPinCheck,
} from "lucide-react";
import AboutCard from "@/app/ui/description/aboutCard";

const jobPostings = require("../../lib/dummyData.json");

const page = () => {
  const { job_id } = useParams<{ job_id: string }>();
  const job_post = jobPostings.job_postings[parseInt(job_id)];
  const {
    title,
    description,
    company,
    image,
    responsibilities,
    when_where,
    about: {
      categories,
      start_date,
      end_date,
      deadline,
      location,
      posted_on,
      required_skills,
    },
    ideal_candidate: { age, gender, traits },
  } = job_post;

  const aboutsInfo = [
    { title: "Posted on", value: posted_on, icon: CircleFadingPlus },
    { title: "Deadline", value: deadline, icon: BellDot },
    { title: "Location", value: location, icon: MapPin },
    { title: "Start Date", value: start_date, icon: CalendarPlus2 },
    { title: "End Date", value: end_date, icon: CalendarCheck },
  ];

  return (
    <div className="text-[#25324B] p-6 flex flex-col sm:flex-row">
      <div className="sm:w-3/4 p-4 flex flex-col gap-8 lg:pr-6">
        <div>
          <h2 className="text-3xl font-extrabold mb-1">Description</h2>
          <p className="text-lg">{description}</p>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold mb-1">Responsibilities</h2>
          {responsibilities.map((responsibility: string, index: number) => (
            <p key={index} className="flex gap-3 py-1 text-lg">
              <CircleCheckBig className="size-6 text-green-600" />
              {responsibility}
            </p>
          ))}
        </div>

        <div>
          <h2 className="text-3xl font-extrabold mb-1">
            Ideal Candidate we want
          </h2>
          <ul className="list-disc pl-6">
            {traits.map((trait: string, index: number) => {
              const [main, desc] = trait.split(":");
              return (
                <li className="text-lg" key={index}>
                  <span className="font-bold">{main}</span>
                  <span>
                    {desc ? `:` : "."} {desc}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold mb-1">When & Where</h2>
          <p>
            <MapPinCheck className="size-6 text-blue-500 mr-1 inline text-lg" />
            {when_where}
          </p>
        </div>
      </div>

      <div className="sm:w-1/4 flex flex-col p-4 gap-8">
        <div>
          <h2 className="text-3xl font-extrabold mb-1">About</h2>
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
          <h2 className="text-3xl font-extrabold mb-1">Categories</h2>
          <div>
            <span className=" text-sm text-orange-400 bg-orange-50 font-semibold rounded-full py-1 px-3">
              {categories[0]}
            </span>
            <span className=" text-sm text-center text-green-400 bg-green-50 font-semibold rounded-full min-w-14 py-1 px-3 ml-2">
              {categories[1]}
            </span>
          </div>
        </div>

        <hr />

        <div>
          <h2 className="text-3xl font-extrabold mb-1">Required Skills</h2>
          <p className="contain-block">
            {required_skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-[#F8F8FD] text-sm text-[#4640DE] m-2 p-2"
              >
                {skill}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
