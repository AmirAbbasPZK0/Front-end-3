"use client";
import BrowserSearch from "@/components/Home/BrowserSearch";
import Cards from "@/components/Home/Cards";
import MovingBoxes from "@/components/Home/MovingBoxes";
import { Stats } from "@/components/Home/Stats";
import TabsFeatures from "@/components/Home/TabFeatures";
import UseOnPhone from "@/components/Home/UseOnPhone";
import WhatIsFindora from "@/components/Home/WhatIsFindora";
import WhyFindora from "@/components/Home/WhyFindora";
import AnimatedText from "./Home/AnimatedText";


export default function Home() {

  

  return (
    
    <div>
      {/* <PreLoader /> */}
      {/* {!(pathname.includes("search")) && <PreLoader />} */}
      <div className="bg-[#f0f0fc] dark:bg-[#111828]">
        <WhatIsFindora />
        <AnimatedText />
        <TabsFeatures />
        <Stats />
        <MovingBoxes />
        <Cards />
        {/* <IntroVideo /> */}
      </div>
      <WhyFindora />
      <BrowserSearch />
      <UseOnPhone />
    </div>
  );
}
