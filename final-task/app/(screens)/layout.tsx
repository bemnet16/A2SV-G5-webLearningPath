"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

export default function ScreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();

  return (
    <div>
      <nav className="h-16 bg-stone-50 border-b shadow-sm fixed top-0 left-0 w-full flex items-center justify-between z-50">
        <ul className="flex gap-3 text-slate-600 text-lg font-bold ml-8">
          <Link href="/" className="hover:underline hover:text-orange-900">
            Home
          </Link>
          <Link
            href="/job-list"
            className="hover:underline hover:text-orange-900"
          >
            Opportunities
          </Link>
          <Link
            href="/bookmarks"
            className="hover:underline hover:text-orange-900"
          >
            Bookmarks
          </Link>
        </ul>

        <ul>
          {session ? (
            <div className="fixed top-2 right-3 flex gap-2 items-center justify-center mr-2">
              {session?.user.image ? (
                <Image
                  src={
                    session?.user ? session?.user.image : "/images/job1.jpeg"
                  }
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="profile image"
                />
              ) : (
                <span className="bg-orange-200 border-2 text-green-900 font-bold border-orange-800 flex items-center justify-center p-4 rounded-full w-10 h-10">
                  {session?.user.name[0].toUpperCase()}
                </span>
              )}
              <div className="flex flex-col">
                <p className="text-sm text-slate-700">{session?.user.name}</p>
                <p className="text-xs text-slate-500">{session?.user.email}</p>
              </div>
              <Link
                href="/api/auth/signout"
                className="bg-gray-200 p-3 rounded-md hover:bg-gray-300"
              >
                <LogOutIcon className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="fixed top-3 right-3 flex gap-2 items-center justify-center mr-2">
              <Link
                className="bg-orange-300 text-orange-800 hover:bg-orange-200 text-sm font-bold rounded-full py-2 px-4 border-2 border-orange-800"
                href="/signin"
              >
                Log In
              </Link>
              <Link
                className="bg-indigo-300 text-indigo-800 hover:bg-indigo-200 text-sm font-bold rounded-full py-2 px-4 border-2 border-indigo-800"
                href="/signup"
              >
                Register
              </Link>
            </div>
          )}
        </ul>
      </nav>
      <div className="  mt-16">{children}</div>
    </div>
  );
}
