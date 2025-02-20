"use client";
import Image from "next/image";
import React from "react";
import phoneImg from "@/../public/images/phone.png";
import GoooglePlayIcon from "@/../public/images/google_play_icon.webp";
import AppStoreIcon from "@/../public/images/app_store_icon.png";
import Link from "next/link";
import oLogo from "@/../public/images/o.png";

const UseOnPhone = () => {
  return (
    <div className=" px-4 md:px-8 pb-20 md:pb-24 max-w-7xl mx-auto">
      <div className="relative bg-gradient-to-tr from-[#026095] via-[#511f78] to-[#c31069] rounded-3xl flex flex-col md:flex-row justify-center items-center gap-4 overflow-hidden">
        <div className=" md:w-2/3 flex flex-col gap-4 text-white p-16">
          <div className=" flex flex-col lg:flex-row lg:gap-1">
            <div className="flex gap-1">
              <span className="text-2xl font-bold">Access</span>
              <div className=" flex">
                <span className=" text-2xl font-bold">find</span>
                <Image
                  src={oLogo}
                  alt="o"
                  width={16}
                  height={16}
                  className=" object-contain lg:pt-1"
                />
                <span className=" text-2xl font-bold">ra</span>
              </div>
            </div>
            <span className=" text-2xl font-bold">on Your Phone</span>
          </div>

          <p>
            findora is available on desktop and mobile. Get the same
            fact-checked search experience wherever you go.
          </p>
          <div className=" flex gap-4">
            <Link href="/">
              <Image
                src={GoooglePlayIcon}
                width={150}
                height={150}
                alt="google play"
              />
            </Link>
            <Link href="/">
              <Image
                src={AppStoreIcon}
                width={150}
                height={150}
                alt="app store"
              />
            </Link>
          </div>
        </div>
        <div className=" pt-0 lg:pt-16 px-16 self-end">
          <Image src={phoneImg} width={250} height={250} alt="phone" />
        </div>
      </div>
    </div>
  );
};

export default UseOnPhone;
