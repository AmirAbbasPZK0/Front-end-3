import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

interface LinkProps {
  link: {
    url: string;
    title: string;
    icon: IconType;
  };
}

const NavLink: React.FC<LinkProps> = ({ link }) => {
  const pathName = usePathname();
  return (
    <Link
      className={`${
        pathName === link.url && " bg-[#f9fafc] dark:bg-[#202938] shadow-md"
      } flex items-center gap-2 hover:bg-[#f9fafc] dark:hover:bg-[#202938] py-3 px-5 rounded-full`}
      href={link.url}
    >
      <link.icon size={20} />
      {link.title}
    </Link>
  );
};

export default NavLink;
