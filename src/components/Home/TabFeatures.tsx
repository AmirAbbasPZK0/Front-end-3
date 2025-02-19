"use client";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GoArrowLeft, GoArrowRight, GoDatabase, GoVideo } from "react-icons/go";
import Image from "next/image";
import {
  MdMultipleStop,
  MdOutlineVerified,
  MdPeopleOutline,
} from "react-icons/md";
import { SlMagnifier } from "react-icons/sl";
import { GiMaterialsScience } from "react-icons/gi";

const TabsFeatures = () => {
  const [selected, setSelected] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Track if tab is in view
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isTabInView = (index: number) => {
    if (tabRefs.current[index]) {
      const rect = tabRefs.current[index]?.getBoundingClientRect();
      return rect && rect.top >= 0 && rect.bottom <= window.innerHeight;
    }
    return false;
  };

  // Automatically move to the next tab every 5 seconds
  useEffect(() => {
    if (isHovered) return; // Prevent auto-switching if hovered

    const interval = setInterval(() => {
      // Move to the next tab only if the current tab is in view
      if (isTabInView(selected)) {
        setSelected((prev) => (prev + 1) % FEATURES.length);
      }
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, [selected, isHovered]);

  return (
    <section className="relative px-4 md:px-8">
      {/* Left Arrow */}
      {selected > 0 && (
        <button
          onClick={() => setSelected((prev) => prev - 1)}
          className="absolute left-5 top-1/2 z-50 transform -translate-y-1/2 p-2 rounded-full bg-white dark:bg-[#202938]"
        >
          <GoArrowLeft size={24} />
        </button>
      )}
      <Tabs selected={selected} setSelected={setSelected} />
      <AnimatePresence mode="wait">
        {FEATURES.map((tab, index) => {
          return selected === index ? (
            <motion.div
              ref={(el) => {
                tabRefs.current[index] = el; // Assign to the ref array without returning anything
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              key={index}
            >
              <tab.Feature setIsHovered={setIsHovered} />
            </motion.div>
          ) : undefined;
        })}
      </AnimatePresence>
      {/* Right Arrow */}
      {selected < FEATURES.length - 1 && (
        <button
          onClick={() => setSelected((prev) => prev + 1)}
          className="absolute right-5 top-1/2 z-50 transform -translate-y-1/2 p-2 rounded-full bg-white dark:bg-[#202938]"
        >
          <GoArrowRight size={24} />
        </button>
      )}
    </section>
  );
};

interface TabsProps {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

const Tabs = ({ selected, setSelected }: TabsProps) => {
  const tabsRef = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (tabsRef.current[selected]) {
      tabsRef.current[selected]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selected]);
  return (
    <div className="flex overflow-x-auto scrollbar-hide md:justify-center">
      {FEATURES.map((tab, index) => (
        <div
          key={index}
          ref={(el) => {
            tabsRef.current[index] = el;
          }}
          className="flex-shrink-0"
        >
          <Tab
            setSelected={setSelected}
            selected={selected === index}
            Icon={tab.Icon}
            title={tab.title}
            tabNum={index}
            bgColor={tab.bgColor}
          />
        </div>
      ))}
    </div>
  );
};

interface TabProps {
  selected: boolean;
  Icon: IconType;
  title: string;
  setSelected: Dispatch<SetStateAction<number>>;
  tabNum: number;
  bgColor: string;
}

const Tab = ({
  selected,
  Icon,
  title,
  setSelected,
  tabNum,
  bgColor,
}: TabProps) => {
  return (
    <div className="relative w-full">
      <button
        onClick={() => setSelected(tabNum)}
        className="relative z-0 flex w-full flex-row items-center justify-center gap-4 border-b-4 p-6 md:flex-col"
      >
        <span
          style={{ backgroundColor: bgColor }}
          className={`rounded-lg p-1 lg:p-3 text-2xl text-white shadow-indigo-400 transition-all duration-300 ${
            selected
              ? "scale-100 opacity-100 shadow-lg"
              : "scale-90 opacity-50 shadow"
          }`}
        >
          <Icon />
        </span>
        <span
          className={`lg:min-w-[150px] lg:max-w-[200px] text-start text-xs text-slate-600 transition-opacity md:text-center ${
            selected ? "opacity-100" : "opacity-50"
          }`}
        >
          {title}
        </span>
      </button>
      {selected && (
        <motion.span
          layoutId="tabs-features-underline"
          className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-indigo-600"
        />
      )}
    </div>
  );
};

interface ExampleFeatureProps {
  image: string;
  text: string;
  desc: string;
  button: string;
  url: string;
  textColor: string;
  setIsHovered: Dispatch<SetStateAction<boolean>>; // Added setIsHovered to control hover state
}

const ExampleFeature = ({
  image,
  text,
  desc,
  button,
  url,
  textColor,
  setIsHovered,
}: ExampleFeatureProps) => (
  <div
    className="px-4 md:px-8 w-full pt-8"
    onMouseEnter={() => setIsHovered(true)} // Set hover to true when mouse enters the feature box
    onMouseLeave={() => setIsHovered(false)} // Set hover to false when mouse leaves the feature box
  >
    <div className="bg-white dark:bg-[#202938] rounded-3xl p-8 flex flex-col lg:flex-row gap-8 items-center">
      <div className="lg:w-1/2">
        <Image
          src={image}
          alt="img"
          width={500}
          height={500}
          className=" object-center object-cover rounded-xl"
        />
      </div>
      <div className="lg:w-1/2 flex flex-col gap-4">
        <h6 className=" text-2xl font-bold" style={{ color: textColor }}>
          {text}
        </h6>
        <p>{desc}</p>
        <Link
          href={url}
          style={{ backgroundColor: textColor }}
          className=" flex gap-1 items-center font-medium group rounded-full w-fit text-white py-2 px-4 text-sm"
        >
          {button}
          <div className="lg:group-hover:translate-x-1 transition duration-300 ease-in-out">
            <GoArrowRight />
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default TabsFeatures;

const FEATURES = [
  {
    title: "Verified Answers",
    bgColor: "#008f7a",
    Icon: MdOutlineVerified,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature1.jpg"
        text="Verified Answers"
        desc="Get results backed by fact-checking and credible sources."
        button="Ask Your Question"
        url="/"
        textColor="#008f7a"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Website Trust Analysis",
    bgColor: "#eaba33",
    Icon: SlMagnifier,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature2.jpg"
        text="Website Trust Analysis"
        desc="Instantly check any website’s reliability and trustworthiness."
        button="Summarize"
        url="/"
        textColor="#eaba33"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Scientific Search",
    bgColor: "#0b87b6",
    Icon: GiMaterialsScience,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature3.png"
        text="Scientific Search"
        desc="Access peer-reviewed research and academic insights."
        button="Analyze Docs"
        url="/"
        textColor="#0b87b6"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Multi-Format Search",
    bgColor: "#511f78",
    Icon: MdMultipleStop,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature4.webp"
        text="Multi-Format Search"
        desc="Analyze URLs, text, and files together for deep insights."
        button="Create images"
        url="/"
        textColor="#511f78"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Video Intelligence",
    bgColor: "#c31069",
    Icon: GoVideo,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature5.webp"
        text="Video Intelligence"
        desc="Find accurate, fact-based answers from videos."
        button="Check your grammar"
        url="/"
        textColor="#c31069"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Data Ownership & Privacy",
    bgColor: "#b25327",
    Icon: GoDatabase,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature1.jpg"
        text="Data Ownership & Privacy"
        desc="You own your data. If used for better performance, it remains encrypted and fully anonymous."
        button="Ask Your Question"
        url="/"
        textColor="#b25327"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Enterprise Solutions",
    bgColor: "#0c3c4c",
    Icon: MdPeopleOutline,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature1.jpg"
        text="Enterprise Solutions"
        desc="Businesses can integrate findora’s AI-powered fact-checking into their platforms."
        button="Ask Your Question"
        url="/"
        textColor="#0c3c4c"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
];
