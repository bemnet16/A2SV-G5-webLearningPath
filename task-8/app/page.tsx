"use client";

import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 flex bg-custom-bg bg-cover bg-center items-center justify-center h-screen w-full">
      <Link
        className="text-4xl flex hover:underline gap-4 mr-48 text-gray-700 font-bold"
        href="/job-list"
      >
        Job Lists
        <ArrowBigRight className="animate-ping" size={38} />
      </Link>
    </div>
  );
}
