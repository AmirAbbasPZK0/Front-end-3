"use client";
import React, { ChangeEvent, useEffect, useRef } from "react";
import Image from "next/image"
import LogoBlack from "@/../public/images/findora_logo_black.png";
import LogoWhite from "@/../public/images/findora_logo_white.png";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/services/redux/store";
import { loginHandler } from "@/services/redux/reducers/userSlice";
import Cookies from "js-cookie";
import { signUp } from "@/actions/signUp";
import { FcGoogle } from 'react-icons/fc';
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const LoginFormHandler = ({ onClose }: { onClose: (value: boolean) => void }) => {

  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")

  const login = () => {
    signUp()
  }

  const dispatch = useAppDispatch()

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    let data = {
      email: e.target?.email.value,
      password: e.target?.password.value
    }

    if (data.email === "") {
      toast.error("Email is Required", {
        duration: 3000,
      });
    } else if (data.password === "") {
      toast.error("Password is Required", {
        duration: 3000,
      });
    }

    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })

    let result = await res.json()

    if (result.code !== 200) {
      switch (result.code) {
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
    } else {
      Cookies.set("access_token", result?.data?.jwt, { path: "/", sameSite: 'strict' })
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
      onClose(false)
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r rounded-full mb-3"
        >
          <b>
            <Image
              src={LogoBlack}
              alt="logo"
              width={80}
              height={80}
              className="block dark:hidden"
            />
            <Image
              src={LogoWhite}
              alt="logo"
              width={80}
              height={80}
              className="hidden dark:block"
            />
          </b>
        </motion.div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">Sign in to your account</p>
      </div>

      <form ref={form} onSubmit={onSubmit} className="space-y-4">
        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="space-y-1"
        >
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              placeholder="Enter your email"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Password Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="space-y-1"
        >
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm pr-10"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {showPass ? <FaRegEyeSlash className="w-4 h-4" /> : <FaRegEye className="w-4 h-4" />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              onClick={() => onClose(false)}
              className="text-xs text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors duration-200"
              href={"/reset-password"}
            >
              Forgot password?
            </Link>
          </div>
        </motion.div>

        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <ShinySkeuButton isPending={loading} />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative my-4"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400">Or continue with</span>
          </div>
        </motion.div>

        {/* Google Sign In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <button
            type="button"
            onClick={login}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-all duration-200 shadow-sm hover:shadow-md text-sm"
          >
            <FcGoogle className="h-4 w-4" />
            <span className="text-gray-700 dark:text-gray-200 font-medium">Google</span>
          </button>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="text-center pt-2"
        >
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Don't have an account?{" "}
            <Link
              onClick={() => onClose(false)}
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-semibold transition-colors duration-200"
              href={"/signup"}
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </form>
    </div>
  );
};

const ShinySkeuButton = ({ isPending }: { isPending: boolean }) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const button = btnRef.current;
    const parent = parentRef.current;
    if (!button || !parent) return;

    const handleMouseOver = () => {
      parent.style.setProperty("--size", "300px");
      parent.style.setProperty("--shineColor", "rgba(255, 255, 255, 0.4)");
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
        className="w-full overflow-hidden font-semibold cursor-pointer text-white rounded-lg px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none skeu text-sm"
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>Signing in...</span>
          </div>
        ) : (
          <span>Sign In</span>
        )}
      </button>
    </div>
  );
};

export default LoginFormHandler;
