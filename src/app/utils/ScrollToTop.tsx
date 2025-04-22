"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "./lenis";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Global/Navbar";
import { Footer } from "@/components/Global/Footer";

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lenis = useLenis();

  // useEffect(() => {
  //   lenis?.scrollTo(0, { immediate: true });
  // }, [pathname, searchParams, lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      {children}
      {/* <Footer /> */}
    </ReactLenis>
  );
};

export default ScrollToTop;
