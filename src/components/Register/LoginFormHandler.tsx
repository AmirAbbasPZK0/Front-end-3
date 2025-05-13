"use client";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/services/redux/store";
import { loginHandler } from "@/services/redux/reducers/userSlice";
import { useRouter  } from "next/navigation";
import Cookies from "js-cookie";
import { signUp } from "@/actions/signUp";
import { FcGoogle } from 'react-icons/fc';
import { useState } from "react";

const LoginFormHandler: React.FC = () => {

  const form = useRef<HTMLFormElement | null>(null);
  const [pending , setPending] = useState(false)
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState("")

  const router = useRouter()

  const login = () => {
    signUp()
  }

  const dispatch = useAppDispatch()

  const onSubmit = async (e :  ChangeEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    let data = {
      email : e.target?.email.value,
      password : e.target?.password.value
    }

    if(data.email === ""){
      toast.error("Email is Required", {
        duration: 3000,
      });
    }else if(data.password === ""){
      toast.error("Password is Required", {
        duration: 3000,
      });
    }

    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login/` , {
      method : "POST",
      body : JSON.stringify(data),
      headers : {
        "Content-Type" : "application/json"
      }
    })
    
    let result = await res.json()

    if(result.code !== 200){
      switch(result.code){
        case 401:
          setError("Email or Password is wrong! Please Try again")
          toast.error(error, {
            duration: 3000,
          });
          setLoading(false)
        case 400:
          setError("Bad Request")
          toast.error(error, {
            duration: 3000,
          });
          setLoading(false)
          break
      }
    }else{
      Cookies.set("access_token" , result?.data?.jwt , {path : "/" , sameSite:'strict'})
      dispatch(loginHandler(result?.data?.user))
      toast.success("Logged in Successfully", {
        duration: 3000,
        // style: {
        //   borderRadius: "10px",
        //   background: "#6a0dad",
        //   color: "white",
        // },
      });
      // setLoading(false)
      router.push("/")
    } 
  }

  return (
    <div className="px-4 md:px-8 py-10 md:py-9 flex justify-center items-center">
      <div className="flex flex-col gap-2 relative z-10">
        <div className="text-center space-y-4">
          <h6 className="text-4xl font-bold">Login</h6>
        <p className="text-lg md:w-[600px]">
        Logging in allows you to save search preferences, access search history, and enjoy a more tailored browsing experience.
        </p>
        </div>
        <form ref={form} onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-6">
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
              <div className="flex flex-row w-full justify-between">
                <span>Forget Password?</span>
                <Link className="text-blue-500" href={"/reset-password"}>Reset Password</Link>
              </div>
            </div>
            <div className="text-center flex items-center justify-center">
              <h2>Or</h2>
            </div>
            <div className="flex flex-col text-center w-full">
              <div>
                <button type="button" onClick={login} className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm hover:bg-gray-50">
                  
                  {pending ? (<>
                    <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  </>) : (<>
                    <FcGoogle className="h-5 w-5" />
                   <span>Continue with Google</span>    
                  </>)}
                
                </button>
              </div>
            </div>
          </div>
          <div>
            <ShinySkeuButton isPending={loading}/>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <p>Don't have an account?</p> <Link className="text-blue-500 font-semibold" href={"/signup"}>Sign Up</Link>
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

const ShinySkeuButton = ({isPending} : {isPending : boolean}) => {
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
        disabled={isPending}
        ref={btnRef}
        type="submit"
        className="w-full overflow-hidden font-mono cursor-pointer text-white rounded px-4 py-2 bg-[radial-gradient(100%_100%_at_100%_0%,_#af8bee_0%,_#6903f6_100%)] transition-[box-shadow_0.15s_ease,_transform_0.15s_ease] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[inset_0px_3px_7px_#6903f6] skeu"
      >
        {isPending ? 
        (<><svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg></>) : 
        <span>Login</span>}
      </button>
    </div>
  );
};

export default LoginFormHandler;
