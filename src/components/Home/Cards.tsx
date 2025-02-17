import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa";

const cardsData = [
  {
    id: 1,
    icon: FaMagnifyingGlass,
    title: "Speed Up Your Research",
    desc: "Seamlessly transition from questions to solutions with quick, accurate search results that fuel your success.",
    color: "#511f78",
  },
  {
    id: 2,
    icon: FaRegLightbulb,
    title: "Accurate Answers in Seconds.",
    desc: "Instantly find the answers you need with AI-powered search that provides clear, concise, and trustworthy results.",
    color: "#eaba33",
  },
  {
    id: 3,
    icon: TbTargetArrow,
    title: "Find the top academic sources effortlessly.",
    desc: "Find exactly what you need with AI optimized for accuracy, relevance, and speed.",
    color: "#0b87b6",
  },
  {
    id: 4,
    icon: FaGraduationCap,
    title: "Revolutionize Your Learning Experience",
    desc: "Solve complex problems with AI insights that enhance understanding and save time.",
    color: "#c31069",
  },
];

const Cards = () => {
  return (
    <div className="px-4 md:px-8 pb-20 md:pb-24 max-w-7xl mx-auto">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="bg-[#f3f3fd] dark:bg-[#111828] border-4 border-white rounded-3xl flex justify-start items-center gap-5 p-8"
          >
            <div>
              <card.icon
                size={60}
                color={card.color}
                className=" bg-white p-3 rounded-2xl"
              />
            </div>

            <div className="flex flex-col justify-between gap-2">
              <h6 className=" text-xl font-bold">{card.title}</h6>
              <p>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
