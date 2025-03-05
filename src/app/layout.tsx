import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./utils/ScrollToTop";
import Providers from "@/services/redux/Providers";
import { Suspense } from "react";
import Layout from "@/components/Engine/Layout";
import { EdgeStoreProvider } from '@/libs/edgestore';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "𝙛𝙞𝙣𝙙𝙤𝙧𝙖 – A Search Engine You Can Trust",
  description: "Search with Confidence. Discover the Truth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
    <html lang="en">
      <head>
        <meta name="theme-color" content="#b898fd" /> {/* Set theme color */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f5f5ff] text-black dark:bg-[#202938] dark:text-white`}
      > <EdgeStoreProvider>
        <Layout>
        <Suspense>
          <ScrollToTop>{children}</ScrollToTop>
        </Suspense>
        </Layout>
        </EdgeStoreProvider>
      </body>
    </html>
    </Providers>
  );
}
