"use client";
import React, { useEffect, useRef, useActionState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/services/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginHandler } from "@/services/redux/reducers/userSlice";


const SignUpFormHandler: React.FC = () => {

  const form = useRef<HTMLFormElement | null>(null);

  const dispatch = useAppDispatch()
  
    const router = useRouter()
  
    const onSubmit = async (e : any) => {
      e.preventDefault()
      let data = {
        name : e.target.name.value,
        email : e.target.email.value,
        password : e.target.password.value
      }
      let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register/` , {
        method : "POST",
        body : JSON.stringify(data),
        headers : {
          "Content-Type" : "application/json"
        }
      })
      
      let result = await res.json()
  
      if(result.code !== 200){
        toast("Failed to Fetch")
        return false
      }else{
        Cookies.set("access_token" , result?.data?.token , {path : "/" , expires : 60 * 60 * 60 * 24})
  
        dispatch(loginHandler(result?.data?.user))
  
        router.push("/")
      }
  
      // window.location.reload()
      
    }

  return (
    <div className="px-4 md:px-8 py-10 md:py-20 flex justify-center items-center">
      <div className="flex flex-col gap-10 relative z-10">
        <div className="text-center space-y-4">
          <h6 className="text-4xl font-bold">Sign Up</h6>
        <p className="text-lg md:w-[600px]">
        Logging in allows you to save search preferences, access search history, and enjoy a more tailored browsing experience.
        </p>
        </div>
        <form ref={form} onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col w-full gap-1">
              <label className="self-start text-sm font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
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
          </div>
          <div>
            <ShinySkeuButton />
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <p>Already have an account?</p> <Link className="text-blue-500 font-semibold" href={"/login"}>Login</Link>
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
