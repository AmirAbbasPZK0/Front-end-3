import React from "react";
import { IconType } from "react-icons";
import { FaFire, FaMedal } from "react-icons/fa";
import { LuBadgeCheck, LuTarget } from "react-icons/lu";
import { MdOutlineDoneAll } from "react-icons/md";

const WhyFindoraData = [
  {
    id: 1,
    title: "Why Choose Findora?",
    desc: "Choose Findora for its precision, speed, and relevance. With advanced AI technology, it delivers tailored insights that simplify complex tasks, boost your productivity, and provide clear, actionable solutions.",
  },
  {
    id: 2,
    icon: FaMedal,
    title: "Top-Rated AI",
    desc: "Findora achieved an impressive score of 85.85% on the MMLU-Pro benchmark, surpassing all AI models on the official Hugging Face leaderboard, and 78.28% on the GPQA benchmark. Findora is ranked as the #1 AI worldwide overall.",
    color: "#008f7a",
  },
  {
    id: 3,
    icon: LuBadgeCheck,
    title: "The top search engine of 2024",
    desc: "Findora is the top choice among AI and traditional search engines. Its exceptional accuracy and reliability have earned Findora the title of Best Search Engine of 2024 by Slashdot.",
    color: "#511f78",
  },
  {
    id: 4,
    icon: MdOutlineDoneAll,
    title: "Everything You Need in One Place",
    desc: "Findora not only offers the most accurate and fastest AI available but also unlocks new features like Document Analysis, Image Creation, Follow-Up questions, Search History access, and more exciting features coming soon.",
    color: "#0b87b6",
  },
  {
    id: 5,
    icon: LuTarget,
    title: "Tailored Responses",
    desc: "Get tailored responses that suit your learning style and needs. Whether it's a challenging math problem or a complex essay, Findora provides the precise answers you're looking for.",
    color: "#eaba33",
  },
  {
    id: 6,
    icon: FaFire,
    title: "Seamless, Ad-Free Experience",
    desc: "Stay focused with an entirely ad-free experience that won’t disrupt your studies. Get the answers you need without distractions and complete your homework more quickly.",
    color: "#c31069",
  },
];

const WhyFindora = () => {
  return (
    <div className=" px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-4 py-20 md:py-24 max-w-7xl mx-auto">
      {WhyFindoraData.map((data) => {
        return (
          <Card
            key={data.id}
            title={data.title}
            desc={data.desc}
            Icon={data.icon}
            color={data.color}
          />
        );
      })}
    </div>
  );
};
interface CardProps {
  Icon?: IconType; // Icon is optional
  title: string;
  desc: string;
  color?: string;
}

const Card = ({ Icon, title, desc, color }: CardProps) => {
  return (
    <div className="text-center bg-white dark:bg-[#111828] first:bg-transparent dark:first:bg-transparent flex flex-col justify-between items-center first:justify-normal gap-4 p-12 rounded-2xl">
      {Icon && <Icon size={60} color={color} />}
      {/* Render Icon only if it's provided */}
      <h6 className="text-2xl font-semibold">{title}</h6>
      <p className="text-lg">{desc}</p>
    </div>
  );
};

export default WhyFindora;
