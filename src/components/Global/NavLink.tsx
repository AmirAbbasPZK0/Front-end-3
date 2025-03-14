import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/services/redux/store";
import { addRecency } from "@/services/redux/reducers/resourceSlice";
import { removeAllFiles } from "@/services/redux/reducers/fileUploadSlice";
import { addResource } from "@/services/redux/reducers/resourceSlice";
import { removeAllUrls } from "@/services/redux/reducers/urlInputSlice";


interface LinkProps {
  link: {
    url: string;
    title: string;
    icon: IconType;
  };
}

const NavLink: React.FC<LinkProps> = ({ link }) => {
  
  const pathName = usePathname();

  const router = useRouter()

  const dispatch = useAppDispatch()

  return (
    <Link 
      onClick={()=> {
        if(link.title === "Home"){
          dispatch(addRecency())
          dispatch(removeAllFiles())
          dispatch(removeAllUrls())
          dispatch(addResource("web"))
          router.push("/")
        }
      }}
      className={`${
        (pathName === link.url || (pathName.includes("search") && link.url === "/")) && " bg-[#f9fafc] dark:bg-[#202938] shadow-md"
      } flex items-center gap-2 hover:bg-[#f9fafc] dark:hover:bg-[#202938] py-3 px-5 rounded-full`}
      href={link.url}
    >
      <link.icon size={20} />
      {link.title}
    </Link>
  );
};

export default NavLink;
