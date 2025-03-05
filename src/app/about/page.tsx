import AboutBottom from "@/components/About/AboutBottom";
import AboutScrollingImages from "@/components/About/AboutScrollingImages";
import AboutTop from "@/components/About/AboutTop";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Findora is an AI-powered platform designed to enhance productivity through intelligent conversations and content generation. Built with cutting-edge technology, it delivers fast, accurate, and insightful responses to help users solve problems, generate ideas, and streamline tasks. Whether for personal or professional use, Findora empowers users with seamless AI-driven assistance.",
};

const About = () => {
  return (
    <div>
      <div className="bg-[#f0f0fc] dark:bg-[#111828]">
        <AboutTop />
        <AboutScrollingImages />
      </div>
      <AboutBottom />
    </div>
  );
};

export default About;
