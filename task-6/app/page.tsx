import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 lg:w-3/4">
      <Link href="/job-list">Job Lists</Link>
    </div>
  );
}
