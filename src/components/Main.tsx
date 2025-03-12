"use client";
import BrowserSearch from "@/components/Home/BrowserSearch";
import Cards from "@/components/Home/Cards";
import IntroVideo from "@/components/Home/IntroVideo";
import MovingBoxes from "@/components/Home/MovingBoxes";
import PreLoader from "@/components/Home/PreLoader";
import { Stats } from "@/components/Home/Stats";
import TabsFeatures from "@/components/Home/TabFeatures";
import UseOnPhone from "@/components/Home/UseOnPhone";
import WhatIsFindora from "@/components/Home/WhatIsFindora";
import WhyFindora from "@/components/Home/WhyFindora";
import PropmptYard from "./Home/PromptYard";
import AnimatedText from "./Home/AnimatedText";
import LogoBlack from "@/../public/images/findora_logo_black.png";
import LogoWhite from "@/../public/images/findora_logo_white.png";
import Image from "next/image";

export default function Home() {

  return (
    <div>
      {/* <PreLoader /> */}
      {/* <PreLoader /> */}
      <div className="bg-[#f0f0fc] dark:bg-[#111828]">
        <WhatIsFindora />
        <PropmptYard />
        <AnimatedText />
        <TabsFeatures />
        <Stats />
        <MovingBoxes />
        <Cards />
        <IntroVideo />
      </div>
      <WhyFindora />
      <BrowserSearch />
      <UseOnPhone />
    </div>
  );
}
