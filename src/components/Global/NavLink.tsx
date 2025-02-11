"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface LinkProps {
  link: {
    href: string;
    title: string;
  };
}

const NavLink: React.FC<LinkProps> = ({ link }) => {
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
