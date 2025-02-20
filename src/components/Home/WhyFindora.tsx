import React from "react";
import { IconType } from "react-icons";
import { BsPeople } from "react-icons/bs";
import { GiArtificialIntelligence, GiAwareness } from "react-icons/gi";
import { GrSecure } from "react-icons/gr";
import { PiTarget } from "react-icons/pi";

const WhyFindoraData = [
  {
    id: 1,
    title: "Why Choose findora?",
    desc: "Powerful Fact-Checking & Search Solutions for Enterprises",
  },
  {
    id: 2,
    icon: BsPeople,
    title: "Enterprise API",
    desc: "Integrate findora’s verification system into your business.",
    color: "#008f7a",
  },
  {
    id: 3,
    icon: GiArtificialIntelligence,
    title: "AI-Powered Search",
    desc: "Enhance internal research with rigorously filtered results.",
    color: "#511f78",
  },
  {
    id: 4,
    icon: PiTarget,
    title: "Media & Research Intelligence",
    desc: "Ensure your content is factually accurate.",
    color: "#0b87b6",
  },
  {
    id: 5,
    icon: GrSecure,
    title: "Secure & Private Conversations",
    desc: "Ensure user data stays protected with end-to-end encryption.",
    color: "#c31069",
  },
  {
    id: 6,
    icon: GiAwareness,
    title: "Context-Aware Responses",
    desc: "Deliver accurate answers tailored to user input.",
    color: "#c67f48",
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
    <div className="text-center bg-white dark:bg-[#111828] first:bg-transparent dark:first:bg-transparent flex flex-col justify-between items-center first:justify-normal gap-4 p-12 first:pt-0 lg:first:pt-12 rounded-2xl">
      {Icon && <Icon size={60} color={color} />}
      {/* Render Icon only if it's provided */}
      <h6 className="text-2xl font-semibold">{title}</h6>
      <p className="text-lg">{desc}</p>
    </div>
  );
};

export default WhyFindora;
