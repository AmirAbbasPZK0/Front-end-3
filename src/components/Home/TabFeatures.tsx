"use client";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Image from "next/image";
import { CiBoxList, CiImageOn, CiStar } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiFeatherLight } from "react-icons/pi";

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
    <section className="relative px-4 md:px-8 mx-auto max-w-7xl">
      {/* Left Arrow */}
      {selected > 0 && (
        <button
          onClick={() => setSelected((prev) => prev - 1)}
          className="absolute left-0 top-1/2 z-50 transform -translate-y-1/2 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-600 transition"
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
          className="absolute right-0 top-1/2 z-50 transform -translate-y-1/2 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-600 transition"
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
  return (
    <div className="flex overflow-x-scroll">
      {FEATURES.map((tab, index) => {
        return (
          <Tab
            key={index}
            setSelected={setSelected}
            selected={selected === index}
            Icon={tab.Icon}
            title={tab.title}
            tabNum={index}
            bgColor={tab.bgColor}
          />
        );
      })}
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
    <div className="bg-white dark:bg-[#202938] rounded-3xl p-8 flex flex-col lg:flex-row gap-8 items-center min-h-[700px] max-h-[900px]">
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
    title: "Ask AI",
    bgColor: "#008f7a",
    Icon: CiStar,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature1.jpg"
        text="Question AI – Ask a Question"
        desc="Findora's free AI-powered question-and-answer tool allows users to ask questions in everyday language and get precise, in-depth answers tailored to their specific needs. It’s a great alternative to ChatGPT for those seeking accurate and detailed responses"
        button="Ask Your Question"
        url="/"
        textColor="#008f7a"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Summary",
    bgColor: "#eaba33",
    Icon: CiBoxList,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature2.jpg"
        text="Make a summary"
        desc="Findora makes web content easier to understand by converting long URLs into clear, concise bullet points. This allows users to extract information quickly and efficiently."
        button="Summarize"
        url="/"
        textColor="#eaba33"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Docs",
    bgColor: "#0b87b6",
    Icon: IoDocumentTextOutline,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature3.png"
        text="Analyze docs"
        desc="Findora's free AI Answer Engine allows users to ask questions in natural language and receive detailed, accurate responses tailored to their specific queries. It’s a powerful alternative to ChatGPT for those seeking precise and reliable answers."
        button="Analyze Docs"
        url="/"
        textColor="#0b87b6"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Create",
    bgColor: "#511f78",
    Icon: CiImageOn,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature4.webp"
        text="Create images"
        desc="With Findora, your vision comes to life effortlessly — simply describe your needs in plain language, and watch as it turns your ideas into stunning images"
        button="Create images"
        url="/"
        textColor="#511f78"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Grammer",
    bgColor: "#c31069",
    Icon: PiFeatherLight,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature5.webp"
        text="Check your grammar"
        desc="Findora can help fix your grammar with just one click, ensuring your written content is polished and professional effortlessly."
        button="Check your grammar"
        url="/"
        textColor="#c31069"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
];
