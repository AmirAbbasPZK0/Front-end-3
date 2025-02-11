"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ link }: any) => {
  const pathName = usePathname();
  return (
    <Link
      className={`${pathName === link.href && "opacity-50"}`}
      href={link.href}
    >
      {link.title}
    </Link>
  );
};

export default NavLink;
