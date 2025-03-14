"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { CiMedal, CiStar } from "react-icons/ci";
import { LuBrainCircuit } from "react-icons/lu";
import { CiBitcoin } from "react-icons/ci";
import { IoColorPaletteOutline } from "react-icons/io5";
import { PiTelevision } from "react-icons/pi";
import { useEffect, useRef } from "react";

const tabs = [
  { id: "top", label: "Top", icon: CiStar },
  { id: "tech", label: "Tech & Science", icon: LuBrainCircuit },
  { id: "finance", label: "Finance", icon: CiBitcoin },
  { id: "art", label: "Art & Culture", icon: IoColorPaletteOutline },
  { id: "sports", label: "Sports", icon: CiMedal },
  { id: "entertainment", label: "Entertainment", icon: PiTelevision },
];

const TopContents = [
  {
    id: 1,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 2,
    img: "/images/feature2.jpg",
    title: "title 2",
    description: "description 2",
    source: "source 2",
  },
  {
    id: 3,
    img: "/images/feature3.jpg",
    title: "title 3",
    description: "description 3",
    source: "source 3",
  },
  {
    id: 4,
    img: "/images/feature4.jpg",
    title: "title 4",
    description: "description 4",
    source: "source 4",
  },
  {
    id: 5,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 6,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 7,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 8,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
];

const TechContents = [
  {
    id: 1,
    img: "/images/feature4.jpg",
    title: "title tech",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 2,
    img: "/images/feature2.jpg",
    title: "title 2",
    description: "description 2",
    source: "source 2",
  },
  {
    id: 3,
    img: "/images/feature3.jpg",
    title: "title 3",
    description: "description 3",
    source: "source 3",
  },
  {
    id: 4,
    img: "/images/feature4.jpg",
    title: "title 4",
    description: "description 4",
    source: "source 4",
  },
  {
    id: 5,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 6,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 7,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 8,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
];

const FinanceContents = [
  {
    id: 1,
    img: "/images/feature5.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 2,
    img: "/images/feature2.jpg",
    title: "title 2",
    description: "description 2",
    source: "source 2",
  },
  {
    id: 3,
    img: "/images/feature3.jpg",
    title: "title 3",
    description: "description 3",
    source: "source 3",
  },
  {
    id: 4,
    img: "/images/feature4.jpg",
    title: "title 4",
    description: "description 4",
    source: "source 4",
  },
  {
    id: 5,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 6,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 7,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 8,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
];

const ArtContents = [
  {
    id: 1,
    img: "/images/feature6.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 2,
    img: "/images/feature2.jpg",
    title: "title 2",
    description: "description 2",
    source: "source 2",
  },
  {
    id: 3,
    img: "/images/feature3.jpg",
    title: "title 3",
    description: "description 3",
    source: "source 3",
  },
  {
    id: 4,
    img: "/images/feature4.jpg",
    title: "title 4",
    description: "description 4",
    source: "source 4",
  },
  {
    id: 5,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 6,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 7,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 8,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
];

const SportsContents = [
  {
    id: 1,
    img: "/images/feature2.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 2,
    img: "/images/feature2.jpg",
    title: "title 2",
    description: "description 2",
    source: "source 2",
  },
  {
    id: 3,
    img: "/images/feature3.jpg",
    title: "title 3",
    description: "description 3",
    source: "source 3",
  },
  {
    id: 4,
    img: "/images/feature4.jpg",
    title: "title 4",
    description: "description 4",
    source: "source 4",
  },
  {
    id: 5,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 6,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 7,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 8,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
];

const EntertainmentContents = [
  {
    id: 1,
    img: "/images/feature3.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 2,
    img: "/images/feature2.jpg",
    title: "title 2",
    description: "description 2",
    source: "source 2",
  },
  {
    id: 3,
    img: "/images/feature3.jpg",
    title: "title 3",
    description: "description 3",
    source: "source 3",
  },
  {
    id: 4,
    img: "/images/feature4.jpg",
    title: "title 4",
    description: "description 4",
    source: "source 4",
  },
  {
    id: 5,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 6,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 7,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
  {
    id: 8,
    img: "/images/feature1.jpg",
    title: "title 1",
    description: "description 1",
    source: "source 1",
  },
];

const DiscTabsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || tabs[0].id; // Default to first tab
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Focus on the selected tab when activeTab changes
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      tabRefs.current[activeTab]?.focus();
    }
  }, [activeTab]);

  return (
    <div className=" px-4 md:px-8 py-20 md:py-24 max-w-4xl mx-auto">
      {/* Tabs Navigation */}
      <div className="flex justify-center items-center">
        <div className="fixed left-0 right-0 z-50 flex md:justify-center overflow-auto">
          <div className=" backdrop-blur-3xl bg-white/80 dark:bg-black/80 px-4 py-1 rounded-lg flex gap-4 lg:gap-8">
            {tabs.map((tab) => (
              <button
                ref={(el) => {
                  if (el) {
                    tabRefs.current[tab.id] = el;
                  }
                }}
                key={tab.id}
                onClick={() => router.push(`?tab=${tab.id}`)}
                className={`px-2 py-2 flex items-center gap-1 text-xs md:text-sm ${
                  activeTab === tab.id && "bg-purple-400/40 rounded-lg"
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {activeTab === "top" && (
          <>
            {/* First row with full width */}
            <div className="lg:col-span-3">
              <TabContent
                key={TopContents[0].id}
                img={TopContents[0].img}
                title={TopContents[0].title}
                desc={TopContents[0].description}
                source={TopContents[0].source}
              />
            </div>

            {/* Remaining content cards */}
            {TopContents.slice(1).map((content) => (
              <div
                key={content.id}
                className={
                  content.id % 5 === 0 ? "lg:col-span-3" : "lg:col-span-1"
                }
              >
                <TabContent
                  img={content.img}
                  title={content.title}
                  desc={content.description}
                  source={content.source}
                />
              </div>
            ))}
          </>
        )}
        {activeTab === "tech" && (
          <>
            {/* First row with full width */}
            <div className="lg:col-span-3">
              <TabContent
                key={TechContents[0].id}
                img={TechContents[0].img}
                title={TechContents[0].title}
                desc={TechContents[0].description}
                source={TechContents[0].source}
              />
            </div>

            {/* Remaining content cards */}
            {TechContents.slice(1).map((content) => (
              <div
                key={content.id}
                className={
                  content.id % 5 === 0 ? "lg:col-span-3" : "lg:col-span-1"
                }
              >
                <TabContent
                  img={content.img}
                  title={content.title}
                  desc={content.description}
                  source={content.source}
                />
              </div>
            ))}
          </>
        )}
        {activeTab === "finance" && (
          <>
            {/* First row with full width */}
            <div className="lg:col-span-3">
              <TabContent
                key={FinanceContents[0].id}
                img={FinanceContents[0].img}
                title={FinanceContents[0].title}
                desc={FinanceContents[0].description}
                source={FinanceContents[0].source}
              />
            </div>

            {/* Remaining content cards */}
            {FinanceContents.slice(1).map((content) => (
              <div
                key={content.id}
                className={
                  content.id % 5 === 0 ? "lg:col-span-3" : "lg:col-span-1"
                }
              >
                <TabContent
                  img={content.img}
                  title={content.title}
                  desc={content.description}
                  source={content.source}
                />
              </div>
            ))}
          </>
        )}
        {activeTab === "art" && (
          <>
            {/* First row with full width */}
            <div className="lg:col-span-3">
              <TabContent
                key={ArtContents[0].id}
                img={ArtContents[0].img}
                title={ArtContents[0].title}
                desc={ArtContents[0].description}
                source={ArtContents[0].source}
              />
            </div>

            {/* Remaining content cards */}
            {ArtContents.slice(1).map((content) => (
              <div
                key={content.id}
                className={
                  content.id % 5 === 0 ? "lg:col-span-3" : "lg:col-span-1"
                }
              >
                <TabContent
                  img={content.img}
                  title={content.title}
                  desc={content.description}
                  source={content.source}
                />
              </div>
            ))}
          </>
        )}
        {activeTab === "sports" && (
          <>
            {/* First row with full width */}
            <div className="lg:col-span-3">
              <TabContent
                key={SportsContents[0].id}
                img={SportsContents[0].img}
                title={SportsContents[0].title}
                desc={SportsContents[0].description}
                source={SportsContents[0].source}
              />
            </div>

            {/* Remaining content cards */}
            {SportsContents.slice(1).map((content) => (
              <div
                key={content.id}
                className={
                  content.id % 5 === 0 ? "lg:col-span-3" : "lg:col-span-1"
                }
              >
                <TabContent
                  img={content.img}
                  title={content.title}
                  desc={content.description}
                  source={content.source}
                />
              </div>
            ))}
          </>
        )}
        {activeTab === "entertainment" && (
          <>
            {/* First row with full width */}
            <div className="lg:col-span-3">
              <TabContent
                key={EntertainmentContents[0].id}
                img={EntertainmentContents[0].img}
                title={EntertainmentContents[0].title}
                desc={EntertainmentContents[0].description}
                source={EntertainmentContents[0].source}
              />
            </div>

            {/* Remaining content cards */}
            {EntertainmentContents.slice(1).map((content) => (
              <div
                key={content.id}
                className={
                  content.id % 5 === 0 ? "lg:col-span-3" : "lg:col-span-1"
                }
              >
                <TabContent
                  img={content.img}
                  title={content.title}
                  desc={content.description}
                  source={content.source}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

interface Tab {
  img: string;
  title: string;
  desc: string;
  source: string;
}
const TabContent = ({ img, title, desc, source }: Tab) => {
  return (
    <div className=" border-2 border-gray-200 rounded-lg bg-white dark:bg-[#111828]">
      <div>
        <img
          src={img}
          alt="img"
          className=" w-full max-h-[200px] object-cover object-center rounded-t-lg"
        />
      </div>
      <div className=" p-4 flex flex-col gap-8">
        <div>
          <h6 className=" font-semibold">{title}</h6>
          <p className=" text-[#777874]">{desc}</p>
        </div>
        <span className=" text-[#7f807c] text-xs font-semibold">{source}</span>
      </div>
    </div>
  );
};

export default DiscTabsPage;
