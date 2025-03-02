"use client";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { GoArrowLeft, GoArrowRight, GoVideo } from "react-icons/go";
import Image from "next/image";
import {
  MdMultipleStop,
  MdOutlinePrivacyTip,
  MdOutlineVerified,
  MdPeopleOutline,
} from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { CiMedicalCross } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

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
    <section className="relative px-4 md:px-8 max-w-7xl mx-auto">
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
    <div className="overflow-x-auto flex tabScroll">
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
          className={`lg:min-w-[150px] lg:max-w-[200px] text-start text-xs text-black dark:text-white transition-opacity md:text-center ${
            selected ? "opacity-100" : "opacity-50"
          }`}
        >
          {title}
        </span>
      </button>
      {selected && (
        <motion.span
          layoutId="tabs-features-underline"
          className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-[#6a0dad]"
        />
      )}
    </div>
  );
};

interface ExampleFeatureProps {
  image: string;
  text: string;
  desc: string;
  longDesc: string;
  buttonText: string;
  textColor: string;
  setIsHovered: Dispatch<SetStateAction<boolean>>; // Added setIsHovered to control hover state
}

const modalAnimation = {
  hidden: {
    y: "100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    y: "100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const ExampleFeature = ({
  image,
  text,
  desc,
  longDesc,
  buttonText,
  textColor,
  setIsHovered,
}: ExampleFeatureProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  // Close modal when clicking outside of it
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="px-4 md:px-8 w-full pt-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-[#202938] rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <Image
            src={image}
            alt="img"
            width={430}
            height={430}
            className=" object-center object-cover rounded-xl"
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-4">
          <h6 className="text-2xl font-bold" style={{ color: textColor }}>
            {text}
          </h6>
          <p className="lg:text-lg">{desc}</p>
          <button
            style={{ backgroundColor: textColor }}
            className="flex gap-1 items-center font-medium group rounded-full w-fit text-white py-2 px-4 text-sm"
            onClick={() => setIsModalOpen(true)}
          >
            {buttonText}
            <div className="lg:group-hover:translate-x-1 transition duration-300 ease-in-out">
              <GoArrowRight />
            </div>
          </button>

          {/* Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-end z-[200]"
                onClick={handleClickOutside} // Handle clicks on the background
              >
                <motion.div
                  ref={modalRef} // Assign ref to modal content
                  variants={modalAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  data-lenis-prevent="true"
                  className="relative h-[70vh] w-full bg-white dark:bg-[#202938]"
                >
                  <div className="space-y-8 lg:space-y-16 py-16 px-8 md:px-16 lg:px-28">
                    <h6 className="text-center text-3xl lg:text-4xl">{text}</h6>
                    <p className="pb-10 lg:text-xl">{longDesc}</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className=" absolute top-5 right-5 lg:opacity-60 lg:hover:opacity-100 transition duration-300 ease-in-out"
                  >
                    <RxCross2 size={30} />
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
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
        longDesc="At Findora, we prioritize accuracy and trust. Our Verified Answers are the result of thorough fact-checking and analysis from credible sources. Each response is carefully vetted to ensure reliability, giving you the confidence that the information you receive is trustworthy and fact-based. Whether you're searching for academic insights, medical data, or general knowledge, Findora guarantees that the answers you find are backed by evidence and expertise."
        buttonText="Learn More"
        textColor="#008f7a"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },

  {
    title: "Scientific Search",
    bgColor: "#eaba33",
    Icon: GiMaterialsScience,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature2.jpg"
        text="Scientific Search"
        desc="Access peer-reviewed research and academic insights."
        longDesc="Unlock a world of peer-reviewed research and authoritative academic insights with Findora’s Scientific Search. Our advanced AI technology sifts through a vast range of scholarly articles, journals, and studies to bring you the most relevant and credible information. Whether you’re exploring groundbreaking discoveries or seeking reliable data for your research, Findora ensures that you have access to scientifically validated sources that are current and accurate."
        buttonText="Learn More"
        textColor="#eaba33"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Multi-Format Search",
    bgColor: "#0b87b6",
    Icon: MdMultipleStop,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature3.jpg"
        text="Multi-Format Search"
        desc="Analyze URLs, text, and files together for deep insights."
        longDesc="Findora's Multi-Format Search empowers you to analyze a variety of content types—URLs, text, and files—simultaneously for deeper, more comprehensive insights. Whether you're researching a specific topic or cross-referencing multiple sources, our platform streamlines your search by integrating and interpreting diverse formats in real-time. This all-in-one approach ensures that you get a complete, fact-checked picture of the information you need, making your search more efficient and effective."
        buttonText="Learn More"
        textColor="#0b87b6"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Video Intelligence",
    bgColor: "#7332a1",
    Icon: GoVideo,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature4.jpg"
        text="Video Intelligence"
        desc="Find accurate, fact-based answers from videos."
        longDesc="Findora’s Video Intelligence leverages cutting-edge AI to extract accurate, fact-based answers directly from video content. By analyzing visual and audio cues, our platform identifies key information, verifies its accuracy, and provides you with reliable insights. Whether you're watching educational videos, interviews, or documentaries, Findora ensures that the answers you find are backed by solid evidence, transforming video content into a trusted source of information."
        buttonText="Learn More"
        textColor="#7332a1"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Medical",
    bgColor: "#c31069",
    Icon: CiMedicalCross,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature5.jpg"
        text="Medical"
        desc="Findora’s Medical search engine is your trusted resource for accurate, up-to-date medical information."
        longDesc="Findora’s Medical search engine is your trusted resource for accurate, up-to-date medical information. Powered by AI, it sifts through a wealth of peer-reviewed research, clinical studies, and medical databases to deliver reliable answers to your health-related queries. Whether you're looking for treatment options, research findings, or expert opinions, Findora ensures that the information you receive is scientifically validated and comes from credible medical sources, supporting informed decisions about your health and well-being."
        buttonText="Learn More"
        textColor="#c31069"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Enterprise Solutions",
    bgColor: "#c67f48",
    Icon: MdPeopleOutline,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature6.jpg"
        text="Enterprise Solutions"
        desc="Businesses can integrate findora’s AI-powered fact-checking into their platforms."
        longDesc="Findora’s Enterprise Solutions offer businesses powerful, AI-driven tools to enhance their workflows with accurate, fact-checked information. Our API allows seamless integration of Findora’s verification and search capabilities into your existing platforms, ensuring that your organization always operates with reliable and transparent data. From research teams to customer support, Findora helps businesses across industries maintain credibility and improve decision-making by delivering trustworthy answers in real time."
        buttonText="Learn More"
        textColor="#c67f48"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
  {
    title: "Privacy & Trust",
    bgColor: "#3d6a7d",
    Icon: MdOutlinePrivacyTip,
    Feature: ({
      setIsHovered,
    }: {
      setIsHovered: Dispatch<SetStateAction<boolean>>;
    }) => (
      <ExampleFeature
        image="/images/feature7.jpg"
        text="Privacy & Trust"
        desc="Protect your data. Stay anonymous. Verify website credibility."
        longDesc="At Findora, we prioritize your privacy and data security. Our platform ensures that your personal information remains protected through end-to-end encryption and strict data privacy practices. We empower users to stay anonymous while conducting searches, providing full transparency on how your data is used. With Findora, you can trust that your interactions are secure, and your privacy is respected, so you can access reliable information with confidence."
        buttonText="Learn More"
        textColor="#3d6a7d"
        setIsHovered={setIsHovered} // Pass the hover handler
      />
    ),
  },
];
