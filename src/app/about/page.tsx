import AboutBottom from "@/components/About/AboutBottom";
import AboutScrollingImages from "@/components/About/AboutScrollingImages";
import AboutTop from "@/components/About/AboutTop";
import React from "react";

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
