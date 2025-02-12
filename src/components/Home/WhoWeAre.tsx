"use client";
import React from "react";
import { motion } from "framer-motion";
const WhoWeAre = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-16">
      <div>
        <div className=" overflow-hidden">
          <motion.h3
            initial={{ y: 175, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className=" text-6xl text-center dark:text-[#fdfdfd]"
          >
            {"We’re"} a team passionate about AI, dedicated to creating smart,
            user-friendly chat experiences. Our goal is to make AI-powered
            conversations seamless, efficient, and accessible to everyone
          </motion.h3>
        </div>
        <br />
        <br />
        <hr className=" bg-[#373737] border-0 h-[1px]" />
        <br />
        <br />
        <div className=" flex flex-col lg:flex-row gap-16 lg:gap-4">
          <span className="lg:w-1/2 text-xl dark:text-[#e3e3e3]">
            How It Works: Chat Smarter with AI
          </span>
          <p className=" lg:w-[20%] text-xl dark:text-[#e3e3e3] ">
            Getting started is simple—just type your question, and our AI will
            generate an instant response. Whether you need quick information,
            creative ideas, or technical help, the chatbot is ready to assist in
            real time.
            <br />
            <br />
            Powered by advanced language models, our AI understands natural
            language and context, making conversations feel smooth and
            intuitive. It can help with writing, research, coding, and more
            while continuously improving to provide accurate responses.
            <br />
            <br />
            Access the chatbot anytime, anywhere, on desktops, tablets, and
            mobile phones. No downloads needed—just open the website and start
            chatting!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
