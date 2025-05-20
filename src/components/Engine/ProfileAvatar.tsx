import React from "react";

const ProfileAvatar = ({ name , size , fontSize} : {name : string , size : string , fontSize : string}) => {
  const getInitials = (fullName : string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const letterColors : any = {
    A: "bg-green-500",
    B: "bg-blue-500",
    C: "bg-red-500",
    D: "bg-yellow-500",
    E: "bg-purple-500",
    F: "bg-pink-500",
    G: "bg-indigo-500",
    H: "bg-orange-500",
    I: "bg-teal-500",
    J: "bg-cyan-500",
    K: "bg-lime-500",
    L: "bg-rose-500",
    M: "bg-amber-500",
    N: "bg-emerald-500",
    O: "bg-sky-500",
    P: "bg-violet-500",
    Q: "bg-fuchsia-500",
    R: "bg-red-600",
    S: "bg-green-600",
    T: "bg-blue-600",
    U: "bg-yellow-600",
    V: "bg-purple-600",
    W: "bg-pink-600",
    X: "bg-indigo-600",
    Y: "bg-orange-600",
    Z: "bg-teal-600",
  };

  return (
    <div className={`${size} ${fontSize} rounded-full ${letterColors[name[0].toUpperCase()]} flex items-center justify-center text-white text-[15px]  shadow-inner`}>
      {getInitials(name ?? "")}
    </div>
  );
};

export default ProfileAvatar;