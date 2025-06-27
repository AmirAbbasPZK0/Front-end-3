import React, { useState, useRef, useEffect } from "react";
import { removeHistory } from "@/services/redux/reducers/userSlice";
import Cookies from "js-cookie";
import {
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { useAppDispatch } from "@/services/redux/store";


const TooltipMenu = ({handleRenameForm ,id} : {handleRenameForm : ()=> void , id : string}) => {

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
        className="p-2 rounded"
      >
        <FiMoreVertical className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-2 mb-6 w-48 origin-top-right dark:bg-slate-800 bg-slate-100 dark:text-white text-black rounded-xl shadow-lg ring-black z-50">
          <button onClick={()=>{
            handleRenameForm()
            setOpen(false)
          }} className="group flex w-full items-center rounded-t-xl dark:hover:bg-slate-700 hover:bg-slate-300 px-4 py-2 text-sm transition">
            <FiEdit2 className="mr-2" /> Rename
          </button>
          <button onClick={()=>{
            // setDeleteModal(true)
            dispatch(removeHistory(id))
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/history/${id}` , {
              method : "DELETE",
              headers : {
                "Authorization" : `Bearer ${Cookies.get("access_token")}`
              }
            })
            setOpen(false)
          }} className="group flex w-full items-center rounded-b-xl dark:hover:bg-slate-700 hover:bg-slate-300 px-4 py-2 text-sm text-red-500 transition">
            <FiTrash2 className="mr-2" /> Delete
          </button>
        </div>
      )}
      {/* {deleteModal && <DeleteModal onClose={()=> setDeleteModal(false)}/>} */}
    </div>
  );
};


export default TooltipMenu;
