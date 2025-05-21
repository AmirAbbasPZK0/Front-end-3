import React, { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import { useAppDispatch } from "@/services/redux/store";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";


const TooltipMenu = ({onClose} : {onClose : () => void}) => {

  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <CiSettings className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed right-2 mb-6 w-48 origin-bottom-left dark:bg-slate-800 bg-slate-200 dark:text-white text-black rounded-xl shadow-lg ring-black z-[2147483647]">
          <Link onClick={onClose} href={"/profile"} className="group flex w-full items-center rounded-xl dark:hover:bg-slate-700 hover:bg-slate-300 px-4 py-2 text-sm transition">
            <FaUser className="mr-2" /> Profile
          </Link>
        </div>
      )}
      {/* {deleteModal && <DeleteModal onClose={()=> setDeleteModal(false)}/>} */}
    </div>
  );
};


export default TooltipMenu;
