"use client";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import restApi from "@/services/restApi";
import endpoints from "@/configs/endpoints";
import toast from "react-hot-toast";

interface SignUpFormProps {
  first_name : string
  last_name : string
  email : string
  password : string
  confirm_password : string
}


const SignUpFormHandler: React.FC = () => {

  const form = useRef<HTMLFormElement | null>(null);
  
  const router = useRouter()
  
  const onSubmit = async (e :  ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    let data = {
      first_name : e.target?.first_name?.value,
      last_name : e.target?.last_name?.value,
      confirm_password : e.target?.confirm_password?.value,
      email : e.target?.email?.value,
      password : e.target?.password?.value
    }

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register/` , {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    }).then(res => {
      if(res.ok){
        return res.json()
      }else{
        throw Error(`${res.status}`)
      }
    }).then(()=>{
      toast.success("your account has been created successfully", {
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#4ABB13",
          color: "white",
        },
      });
      router.push("/")
    }).catch(err => {
      toast.error(`Error Status ${err.message}`)
    })
    
  }

  return (
    <div className="px-4 md:px-8 py-10 md:py-20 flex justify-center items-center">
      <div className="flex flex-col gap-10 relative z-10">
        <div className="text-center space-y-4">
          <h6 className="text-4xl font-bold">Sign Up</h6>
        <p className="text-lg md:w-[600px]">
        Create and account to access search history, and enjoy a more tailored browsing experience.
        </p>
        </div>
        <form ref={form} onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col w-full gap-1">
              <label className="self-start text-sm font-semibold">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                className="outline-none border-2 border-[#d7d7d9] dark:bg-[#111828] rounded-lg focus:border-[#6803f5] py-1 px-2"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="self-start text-sm font-semibold">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                className="outline-none border-2 border-[#d7d7d9] dark:bg-[#111828] rounded-lg focus:border-[#6803f5] py-1 px-2"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="self-start text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="outline-none border-2 border-[#d7d7d9] dark:bg-[#111828] rounded-lg focus:border-[#6803f5] py-1 px-2"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="self-start text-sm font-semibold">
                 Password
              </label>
              <input
                type="password"
                name="password"
                className="outline-none border-2 border-[#d7d7d9] dark:bg-[#111828] rounded-lg focus:border-[#6803f5] py-1 px-2"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="self-start text-sm font-semibold">
                 Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                className="outline-none border-2 border-[#d7d7d9] dark:bg-[#111828] rounded-lg focus:border-[#6803f5] py-1 px-2"
                required
              />
            </div>
          </div>
          <div>
            <ShinySkeuButton />
          </div>
        </form>
      </div>
      <motion.div
        animate={{ translateX: [5, 100] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="w-40 h-40 md:w-52 md:h-52 lg:w-72 lg:h-72 bg-gradient-to-b from-pink-500 to-purple-500 lg:blur-2xl absolute top-40 left-5 opacity-15 rounded-full"
      />
      <motion.div
        animate={{ translateY: [5, 100] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="w-32 h-32 md:w-44 md:h-44 lg:w-64 lg:h-64 bg-gradient-to-b from-pink-500 to-purple-500 lg:blur-2xl absolute top-[20%] right-[10%] opacity-15 rounded-full"
      />
    </div>
  );
};

const ShinySkeuButton: React.FC = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const button = btnRef.current;
    const parent = parentRef.current;
    if (!button || !parent) return;

    const handleMouseOver = () => {
      parent.style.setProperty("--size", "250px");
      parent.style.setProperty("--shineColor", "rgba(255, 255, 255, 0.3)");
    };

    const handleMouseLeave = () => {
      parent.style.setProperty("--size", "0px");
      parent.style.setProperty("--shineColor", "rgba(255, 255, 255, 0.0)");
    };

    const handleMouseMove = (e: MouseEvent) => {
      parent.style.setProperty("--x", `${e.offsetX}px`);
      parent.style.setProperty("--y", `${e.offsetY}px`);
    };

    button.addEventListener("mouseover", handleMouseOver);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mousemove", handleMouseMove);

    return () => {
      button.removeEventListener("mouseover", handleMouseOver);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={parentRef} className="skeuParent">
      <button
        ref={btnRef}
        type="submit"
        className="w-full overflow-hidden font-mono cursor-pointer text-white rounded px-4 py-2 bg-[radial-gradient(100%_100%_at_100%_0%,_#af8bee_0%,_#6903f6_100%)] transition-[box-shadow_0.15s_ease,_transform_0.15s_ease] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[inset_0px_3px_7px_#6903f6] skeu"
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUpFormHandler;
