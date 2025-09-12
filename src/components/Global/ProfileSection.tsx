"use client"

import { AnimatePresence, motion } from "motion/react";
import ProfileAvatar from "../Engine/ProfileAvatar";
import { useAppSelector , useAppDispatch } from "@/services/redux/store";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { editUser } from "@/services/redux/reducers/userSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import { logOut } from '@/actions/logOut';

const ProfileSection = () => {

    const user = useAppSelector(state => state.userSlice.data)

    const [openEditModal , setOpenEditModal] = useState(false)

    const [deleteAccountPending , setDeleteAccountPending] = useState(false)

    const router = useRouter()

    return (<>
        <div className="flex flex-col gap-4  p-4 rounded-md">
            <h1 className="text-[40px] pt-3 pb-3 font-semibold md:text-left text-center">My Account</h1>
            <div className="flex md:flex-row gap-4 flex-col justify-between">
                <div className="flex md:flex-row flex-col gap-4 items-center justify-start">
                    <ProfileAvatar fontSize="text-[50px]" name={user?.first_name ? user?.first_name as string : user?.email as string} size="w-[150px] h-[150px]"/>
                    <div className="flex text-center md:text-left flex-col gap-2">
                        <h1 className="text-[20px] font-semibold">Email</h1>
                        <h1>{user?.email}</h1>
                        {user?.first_name && user?.last_name && <h1 className="text-[20px] font-semibold">Full Name</h1>}
                        <h1>{user?.first_name} {user?.last_name}</h1>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button className="p-3 rounded-md bg-emerald-300 dark:bg-emerald-600 font-semibold">Change Avatar</button>
                    <button onClick={()=> setOpenEditModal(true)} className="p-3 rounded-md bg-blue-300 dark:bg-blue-600 font-semibold">Edit User</button>
                    <button className="bg-red-300 dark:bg-red-700 p-3 rounded-md font-semibold" onClick={async ()=>{
                        await signOut()
                        logOut()
                        setDeleteAccountPending(true)
                        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/delete-account/` , {
                            method : "DELETE",
                            headers : {
                                "Content-Type" : "application/json",
                                "Authorization" : `Bearer ${Cookies.get("access_token")}`
                            }
                        }).then(res => {
                            if(res.ok){
                                return res.json()
                            }
                        }).then(()=>{
                            router.push("/")
                            toast.success("Account Deleted Successfully")
                            Cookies.remove("access_token")
                            window.location.reload()
                        }).catch((err)=>{
                            console.log(err)
                        })
                        .finally(()=>{
                            setDeleteAccountPending(false)
                        })
                    }}>{deleteAccountPending ? "Pending... " : "Delete Account"}</button>
                </div>
            </div>
        </div>
        {openEditModal && <EditProfileModal setClose={()=> setOpenEditModal(false)}/>}
    </>);
}

const EditProfileModal = ({setClose} : {setClose : () => void}) => {

    const dispatch = useAppDispatch()

    const [loading , setLoading] = useState(false)

    return(<>
        <AnimatePresence>
            <form 
                onSubmit={(e : ChangeEvent<HTMLFormElement>) => {
                    setLoading(true)
                    e.preventDefault()
                    dispatch(editUser({
                        first_name : e.target.first_name?.value,
                        last_name : e.target.last_name?.value,
                        email : e.target.email?.value,
                    }))
                    setLoading(false)
                }} className="fixed inset-0 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50"
                    onClick={setClose}
                />
                <motion.div
                    
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-md dark:bg-slate-900 gap-2 text-center flex flex-col rounded-2xl bg-white p-8 shadow-xl"
                >
                    <h1 className="text-[20px] font-semibold">Edit User</h1>
                    <input className="p-2 rounded-md border-2 outline-none" type="text" name="first_name" placeholder="First Name" />
                    <input className="p-2 rounded-md border-2 outline-none" type="text" name="last_name" placeholder="Last Name" />
                    <input className="p-2 rounded-md border-2 outline-none" type="email" name="email" placeholder="Email"/>
                    {loading ? <button className="p-2 rounded-md bg-blue-400 text-white" disabled={true} type="submit">Pending...</button> 
                        : 
                    <button className="p-2 rounded-md bg-blue-400 text-white" type="submit">Submit</button>}
                </motion.div>
            </form>
        </AnimatePresence>
    </>)
}
 
export default ProfileSection;