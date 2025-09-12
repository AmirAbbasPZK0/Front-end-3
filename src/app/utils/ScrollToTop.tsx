"use client";
import React from "react";
import { ReactLenis } from "./lenis";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Global/Navbar";

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {

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
