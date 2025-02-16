"use client";
import Image from "next/image";
import React, { useRef } from "react";
import phoneImg from "@/../public/images/phone.png";
import GoooglePlayIcon from "@/../public/images/google_play_icon.webp";
import AppStoreIcon from "@/../public/images/app_store_icon.png";
import Link from "next/link";

const UseOnPhone = () => {
  return (
    <div>
      <div className=" px-4 md:px-8 pb-20 md:pb-24 max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-tr from-[#026095] via-[#511f78] to-[#c31069] rounded-3xl flex flex-col md:flex-row justify-center items-center gap-4 overflow-hidden">
          <div className=" md:w-2/3 flex flex-col gap-4 text-white p-16">
            <h6 className=" text-2xl font-bold">
              Access Findora on Your Phone
            </h6>
            <p>
              With Findora, you can effortlessly access all its powerful
              features directly from your phone, giving you the flexibility to
              stay connected, manage your activities, and enjoy a seamless
              experience wherever you are—whether at home, on the go, or
              traveling—all with just a few taps.
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
    </div>
  );
};

export default UseOnPhone;
