import { ArrowBigRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 flex items-center justify-center h-screen w-full">
      <Link
        className="text-2xl flex hover:underline gap-4 text-orange-900"
        href="/job-list"
      >
        Job Lists
        <ArrowBigRight size={24} />
      </Link>
    </div>
  );
}
