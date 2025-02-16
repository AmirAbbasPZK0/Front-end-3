import BrowserSearch from "@/components/Home/BrowserSearch";
import Cards from "@/components/Home/Cards";
import IntroVideo from "@/components/Home/IntroVideo";
import MovingBoxes from "@/components/Home/MovingBoxes";
import { Stats } from "@/components/Home/Stats";
import TabsFeatures from "@/components/Home/TabFeatures";
import UseOnPhone from "@/components/Home/UseOnPhone";
import WhatIsFindora from "@/components/Home/WhatIsFindora";
import WhyFindora from "@/components/Home/WhyFindora";

export default function Home() {
  return (
    <div>
      <div className=" bg-[#f0f0fc] dark:bg-[#111828]">
        <WhatIsFindora />
        <TabsFeatures />
        <Stats />
        <Cards />
        <IntroVideo />
      </div>
      <WhyFindora />
      <BrowserSearch />
      <MovingBoxes />
      <UseOnPhone />
    </div>
  );
}
