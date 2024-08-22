import type { Metadata } from "next";
import { epilogue } from "@/app/ui/fonts";
import "./globals.css";

import ReduxProvider from "@/app/store/reduxProvider";
import AuthProvider from "./api/auth/[...nextauth]/authProvider";
import Link from "next/link";

export const metadata: Metadata = {
  title: "job listing application",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={epilogue.className}>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
