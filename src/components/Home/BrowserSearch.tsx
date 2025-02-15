import Image from "next/image";
import React from "react";
import browserImg from "@/../public/images/browser.png";
import Link from "next/link";
const BrowserSearch = () => {
  return (
    <div className=" px-4 md:px-8 pb-20 md:pb-24 max-w-7xl mx-auto">
      <div className=" flex flex-col lg:flex-row justify-center items-center gap-8">
        <div className="lg:w-1/2">
          <Image src={browserImg} alt="img" className=" rounded-xl" />
        </div>
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h6 className=" text-2xl font-bold">Findora browser search</h6>
          <p>
            Our free Findora Answer Engine allows users to ask questions in
            natural language and receive detailed, accurate responses tailored
            to their specific queries.
          </p>
          <Link
            href="/"
            className=" bg-[#c31069] rounded-full w-fit text-white py-2 px-4"
          >
            Add to browser
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrowserSearch;
