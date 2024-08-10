import { LucideIcon } from "lucide-react";
import React from "react";

interface AboutCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

const AboutCard = ({ title, value, icon: Icon }: AboutCardProps) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="border rounded-full p-2">
        <Icon className="size-5 text-cyan-500" />
      </span>
      <div>
        <p className=" text-gray-500">{title}</p>
        <span className=" font-semibold"> {value} </span>
      </div>
    </div>
  );
};

export default AboutCard;
