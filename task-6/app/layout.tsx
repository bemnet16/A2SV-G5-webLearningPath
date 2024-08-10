import type { Metadata } from "next";
import { lusitana } from "@/app/ui/fonts";
import "./globals.css";

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
      <body className={lusitana.className}>{children}</body>
    </html>
  );
}
