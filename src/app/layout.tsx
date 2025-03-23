import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./utils/ScrollToTop";
import Providers from "@/services/redux/Providers";
import { Suspense } from "react";
import Layout from "@/components/Engine/Layout";
import { EdgeStoreProvider } from "@/lib/edgestore";
import 'react-multi-carousel/lib/styles.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "𝙛𝙞𝙣𝙙𝙤𝙧𝙖 – A Search Engine You Can Trust",
    template: "%s - 𝙛𝙞𝙣𝙙𝙤𝙧𝙖 – A Search Engine You Can Trust",
  },
  description:
    "Findora is an advanced AI-powered platform designed for intelligent conversations, content generation, and problem-solving with speed and accuracy.",
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
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
          <meta name="theme-color" content="#b898fd" />
        </head>
        <body
        style={{ fontFamily: "'Roboto', sans-serif" }}
          className={`antialiased bg-[#f5f5ff] text-black dark:bg-[#202938] dark:text-white`}
        >
          <EdgeStoreProvider>
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
