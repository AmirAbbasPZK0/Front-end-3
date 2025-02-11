import Image from "next/image";
import React from "react";
import logo from "@/../public/images/logo.webp";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import NavLink from "./NavLink";

const links = [
  { id: 1, title: "Home", href: "/" },
  {
    id: 2,
    title: "About",
    href: "/about",
  },
  {
    id: 3,
    title: "Contact",
    href: "/contact",
  },
  {
    id: 4,
    title: "Blog",
    href: "/blog",
  },
];

const Navbar = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-8">
      <div className="flex justify-between items-center gap-4 fixed top-[16px] left-[16px] right-[16px] z-[100] mix-blend-difference text-white">
        <Link href="/">
          <Image src={logo} alt="logo" width={50} height={50} />
        </Link>
        <div className=" flex gap-4 text-sm">
          {links.map((link) => (
            <NavLink link={link} key={link.id}></NavLink>
          ))}
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
