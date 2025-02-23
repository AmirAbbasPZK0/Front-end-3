import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./utils/ScrollToTop";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "𝙛𝙞𝙣𝙙𝙤𝙧𝙖 – The Search Engine You Can Trust",
  description: "Search with Confidence. Discover the Truth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#CB9DF0" /> {/* Set theme color */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f5f5ff] text-black dark:bg-[#202938] dark:text-white`}
      >
        <Suspense>
          <ScrollToTop>{children}</ScrollToTop>
        </Suspense>
      </body>
    </html>
  );
}
