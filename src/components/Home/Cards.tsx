import React from "react";
import { BsCameraVideo } from "react-icons/bs";
import { MdFactCheck, MdOutlineInsights } from "react-icons/md";
import { RiCheckboxMultipleLine } from "react-icons/ri";

const cardsData = [
  {
    id: 1,
    icon: MdFactCheck,
    title: "Fact-Checked Sources ",
    desc: "Highlight how findora ensures credibility.",
    color: "#7332a1",
  },
  {
    id: 2,
    icon: MdOutlineInsights,
    title: "Medical and Scientific Insights",
    desc: "Showcase the latest research access.",
    color: "#eaba33",
  },
  {
    id: 3,
    icon: RiCheckboxMultipleLine,
    title: "Multi-Format Search",
    desc: "Emphasize findora’s ability to analyze URLs, text, and files together.",
    color: "#0b87b6",
  },
  {
    id: 4,
    icon: BsCameraVideo,
    title: "Video-Based Knowledge",
    desc: "Show how findora extracts answers from videos.",
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
